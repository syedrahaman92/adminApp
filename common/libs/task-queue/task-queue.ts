import {Condition} from "./conditions"
import {logger} from "../logger"
//import BackgroundTimer from "react-native-background-timer"
import {TaskDescriptor} from "./task-descriptor"
import {load, store} from "../../db"
export type Task = (descriptor?: TaskDescriptor) => Promise<void>
export type QueuedTask = {
  task: Task
  descriptor?: TaskDescriptor
  isPriority?: boolean
}
export class TaskQ {
  waitQ: Array<QueuedTask>
  maxQSize: number
  conditions: Array<Condition>
  flushing: boolean
  name: string

  constructor(conditions?: Array<Condition>) {
    this.maxQSize = 500
    this.waitQ = []
    this.conditions = conditions ? conditions : []
    this.flushing = false
    this.name = ""

    // add run conditions changed listeners for each
    // run condition.
    for (let i = 0; i < this.conditions.length; ++i) {
      this.name += this.conditions[i].name + ","
      this.conditions[i].registerListener(this.conditionsChanged)
    }
  }

  run(j: Task, descriptor?: TaskDescriptor | null | undefined, isPriority?: boolean) {
    let taskIdExists: any

    if (this.waitQ.length >= this.maxQSize) {
      // q is full. just run the Task. best effort.
      logger.logE("Queue", this.name, "is full. Dropping task", j.toString())
      return false
    }

    if (descriptor) {
      // using a taskId to avoid duplication of tasks being pushed to waitQ
      taskIdExists = this.waitQ.find(job => {
        return job.descriptor && job.descriptor.task.key === descriptor.task.key
      })

      if (taskIdExists === undefined) {
        // no duplicate task found, adding
        this.waitQ.push({
          task: j,
          descriptor: descriptor,
          isPriority: isPriority,
        })
      }
    } else {
      // when no taskId, no check required, add
      this.waitQ.push({
        task: j,
        isPriority: isPriority,
      })
    }

    this.conditionsChanged()
    return true
  }

  conditionsChanged = () => {
    if (this.canRun() && !this.flushing) {
      this.flushing = true
      this.runQ()
    }
  }

  async runQ() {
    if (this.waitQ.length === 0) {
      this.flushing = false
      return
    }

    while (this.waitQ.length > 0) {
      this.waitQ.sort((a, b) => {
        return a.isPriority === b.isPriority ? 0 : a.isPriority ? -1 : 1
      })

      // run Tasks in queue. one at a time
      if (!this.canRun()) {
        // network went away while running Tasks in queue
        this.flushing = false
        return
      }

      try {
        //BackgroundTimer.start()

        if (this.waitQ[0].descriptor) {
          await this.waitQ[0].task(this.waitQ[0].descriptor)
        } else {
          await this.waitQ[0].task()
        }
      } catch (e) {
        this.failHandler(e, this.waitQ[0])
      } finally {
        if (this.waitQ[0].descriptor) {
          const key = this.waitQ[0].descriptor.task.key

          const taskDescriptors = await load("tasks")
          if (taskDescriptors && key in taskDescriptors) {
            delete taskDescriptors[key]
            store("tasks", taskDescriptors)
          }
        }

        this.waitQ.shift()
        //BackgroundTimer.stop()
      }
    }

    // set flushing to false everytime each waitQ is empty
    // else it won't enter runQ for the same waitQ
    this.flushing = false
  }

  canRun() {
    return this.conditions.reduce((result, condition) => {
      return result && condition.isTrue()
    }, true)
  }

  // must be arrow fuction as called from catch callback.
  // arrow functions auto-bind to this.
  failHandler = (e: any, j?: QueuedTask) => {
    logger.logE(
      "Task failed.",
      e,
      "\n Task queue name is",
      this.name,
      "\n Task is",
      j ? j.toString() : j
    )

    if (j && !this.canRun()) {
      // Task may have failed because run conditons became false
      this.run(j.task)
      logger.logE("Will retry.")
    }
  }
}
