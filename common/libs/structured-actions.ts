import {Dispatch, createStore, applyMiddleware} from "redux"
import type {Store} from "redux"

type ActionPlainObject<T = void> = {
  type: string
  actionObj?: Action<T>
  params: T
}

export class Action<T = void> {
  params: T
  type: string
  actionObj?: Action<T>

  constructor(params: T) {
    this.type = this.constructor.name
    this.params = params
  }

  reduce(state: unknown) {
    console.log("Error: must override in child class")
    return state
  }

  getPlainObj(): ActionPlainObject<T> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return {
      type: self.type,
      actionObj: self,
      params: self.params,
    }
  }
}

function rootReducer<E extends Record<string, unknown>>(initialState: E) {
  return (state: E = initialState, action: ActionPlainObject<unknown>) => {
    if (action.actionObj && action.actionObj instanceof Action) {
      const newState = {...state}
      action.actionObj.reduce(newState) // copy state to new object
      return newState
    }
    return state
  }
}

// needed for backwards compatibility for classes
// still using mapDispatchToProps
function getDispatchHandler(d: Dispatch) {
  return d
}

// dispatcher to handle our very own structured redux actions
const customActionDispatcher = () => (next: Dispatch) => (action: Action<unknown>) => {
  return next(action.getPlainObj())
}

// logger middleware
const actionLogger = () => (next: Dispatch) => (action: Action<unknown>) => {
  console.log("dispatching", action.type)
  return next(action)
}

let store: Store<any, ActionPlainObject<unknown>> | undefined

function setupReduxStore<E extends Record<string, unknown>>(initialState: E) {
  let middleware = applyMiddleware(customActionDispatcher)
  if (__DEV__) {
    middleware = applyMiddleware(actionLogger, customActionDispatcher)
  }

  store = createStore(rootReducer(initialState), middleware)

  return store
}

export default {
  getDispatchHandler,
  setupReduxStore,
}
