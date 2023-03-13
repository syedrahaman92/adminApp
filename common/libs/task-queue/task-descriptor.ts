import {load, store} from "../../db"

export class TaskDescriptor {
  task: {
    key: string
    step: number
    hasStarted?: boolean
  }

  constructor(category: string, id: any) {
    this.task = {
      key: category + ":" + id,
      step: 1,
      hasStarted: false,
    }
  }

  async startStep() {
    this.task.hasStarted = true
    //const realm = Database.getDb()

    // if (realm) {
    const taskDescriptors = await load("tasks")
    //const storedTask = realm.objectForPrimaryKey("TaskDescriptor", this.task.key)

    // last succeded step was stored in storedTask
    // if current task step is already exist in the DB, skip the step
    if (
      taskDescriptors &&
      taskDescriptors[this.task.key] &&
      taskDescriptors[this.task.key].step >= this.task.step
    ) {
      this.task.step++
      return false
    }
    // }

    return true
  }

  async stepCompleted() {
    if (!this.task.hasStarted) {
      throw "startStep method was not invoked"
    }

    // delete this.task.hasStarted
    // const realm = Database.getDb()

    // if (realm) {
    const taskDescriptors = await load("tasks")
    if (taskDescriptors) {
      taskDescriptors[this.task.key] = this.task
      store("tasks", taskDescriptors)
    }
    // const storedTask = realm.objectForPrimaryKey("TaskDescriptor", this.task.key)
    // realm.write(() => {
    // if (storedTask) {
    // const taskCopy = {...this.task}
    // delete taskCopy.key
    // Object.assign(storedTask, taskCopy)
    // } else {
    // realm.create("TaskDescriptor", this.task)
    // }
    // })
    // }

    this.task.step++
  }
}
