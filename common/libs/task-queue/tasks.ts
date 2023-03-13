import {TaskQ} from "./task-queue"
import {netCondition, authCondition, locationCondition} from "./conditions"

export const NetTasks = new TaskQ([netCondition])
export const NetAuthTasks = new TaskQ([netCondition, authCondition])
export const NetLocTasks = new TaskQ([netCondition, locationCondition])
export const AuthTasks = new TaskQ([authCondition])
export const NetAuthLocTasks = new TaskQ([netCondition, authCondition, locationCondition])
