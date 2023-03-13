import {logger} from "../logger"
export class ConditionListeners {
  listeners: Array<() => void>

  constructor() {
    this.listeners = []
  }

  register(listener: () => void) {
    const found = this.listeners.find(item => {
      return item === listener
    })

    if (!found) {
      this.listeners.push(listener)
    }
  }

  notify() {
    this.listeners.forEach(listener => {
      listener()
    })
  }
}
export class Condition {
  listeners: ConditionListeners
  available: boolean
  name: string
  errMsg: string | null | undefined

  constructor(name: string) {
    this.listeners = new ConditionListeners()
    this.available = false
    this.name = name
  }

  registerListener(changeListener: () => void) {
    this.listeners.register(changeListener)
  }

  isTrue() {
    return this.available
  }

  // with the introduction of setError, this
  // function requires more explanation. A condition
  // can remain "satisfied" even if its current
  // status is "failed". For example, location can
  // be updated several times and the last update
  // can fail, but the value from the previous
  // udpate is still available and usable.
  satisfied(isSatisfied: boolean, msg?: string) {
    this.available = isSatisfied
    this.listeners.notify()
    logger.logI(
      this.name + (isSatisfied ? " available" : " not available") + (msg ? ". " + msg : "")
    )
  }

  setError(errMsg: string) {
    this.errMsg = errMsg
    this.listeners.notify()
  }

  getError() {
    return this.errMsg
  }
}
// add new conditions here
export const locationCondition = new Condition("Location")
export const authCondition = new Condition("AuthCredentials")
export const netCondition = new Condition("Network")
