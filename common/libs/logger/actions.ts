import {Action} from "../structured-actions"
import type {AppState} from "../../../common/types"
import {NotificationAction, NotificationLevel} from "./types"

export class ActionLog extends Action<string> {
  reduce(state: AppState) {
    state.app.logs = [...state.app.logs, this.params + "\n\n"]
  }
}

export type NotifyParams = {
  msg: string
  action?: NotificationAction
  level?: NotificationLevel
}

export class ActionNotify extends Action<NotifyParams> {
  reduce(state: AppState) {
    state.app.currNotificationMsg = this.params.msg
    state.app.currNotificationAction = this.params.action
    state.app.currNotificationLevel = this.params.level ? this.params.level : "Error"
    state.app.notificationAreaVisible = true
  }
}
