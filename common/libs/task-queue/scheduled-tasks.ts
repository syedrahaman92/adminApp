import {logger} from "../logger"

type TaskFunc = () => void | (() => Promise<void>)

type ScheduledTask = {
  task: TaskFunc
  timeoutID: (TimeoutID | IntervalID) | null | undefined
  repetitions: number
}

export class ScheduledTaskQ {
  scheduledTasks: Array<ScheduledTask> = []
  _makeManagedTask = (task: TaskFunc) => {
    return async () => {
      try {
        await task()
      } catch (e) {
        logger.logE("Error executing scheduled task", task, e)
      }

      this.remove(task)
    }
  }

  add(task: TaskFunc, msec: number) {
    const timeoutID: TimeoutID = setTimeout(this._makeManagedTask(task), msec)
    this.scheduledTasks.push({
      task,
      timeoutID,
      repetitions: 1,
    })
  }

  addRecurring(task: TaskFunc, intervalMsec: number, repetitions: number) {
    const timeoutID: IntervalID = setInterval(this._makeManagedTask(task), intervalMsec)
    this.scheduledTasks.push({
      task,
      timeoutID,
      repetitions,
    })
  }

  remove(task: TaskFunc) {
    const taskIdx = this.scheduledTasks.findIndex(t => {
      return t.task === task
    })

    if (taskIdx > -1) {
      // update repetiion count; decrement by one
      // if more repetitions left, don't remove task
      if (--this.scheduledTasks[taskIdx].repetitions > 0) {
        return
      }

      // clear timeout if present
      if (this.scheduledTasks[taskIdx].timeoutID) {
        //$FlowFixMe timeout and interval ids are from same pool
        clearTimeout(this.scheduledTasks[taskIdx].timeoutID)
      }

      // delete from task list
      this.scheduledTasks.splice(taskIdx, 1)
    }
  }

  removeAll() {
    this.scheduledTasks.forEach(t => {
      if (t.timeoutID) {
        //$FlowFixMe timeout and interval ids are from same pool
        clearTimeout(t.timeoutID)
      }
    })
    this.scheduledTasks = []
  }
}
