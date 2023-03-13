import {QueryClient} from "react-query"
//import {InitialState as reduxState} from "../../app-state-manager"
import {defaultReduxState as reduxState} from "../state"
import {ConditionTrackers} from "./task-queue/condition-trackers"
import sa from "./structured-actions"
import {logger} from "./logger"

// setup react-query
export const queryClient = new QueryClient()

export const reduxStore = sa.setupReduxStore(reduxState)

export const conditionTrackers = new ConditionTrackers(reduxStore.dispatch)

logger.setReduxDispatch(reduxStore.dispatch)
