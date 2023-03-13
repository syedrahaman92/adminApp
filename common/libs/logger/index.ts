import {ActionLog, ActionNotify} from "./actions"
import type {NotifyParams} from "./actions"
import type {NotificationLevel} from "./types"
import {Dispatch} from "redux"

export class NotificationManager {
  dispatch?: Dispatch

  log(level: NotificationLevel, ...args: any) {
    let msg = level + ": "

    // build message
    for (let i = 0; i < args.length; i++) {
      if (args[i] == null) {
        continue
      }

      if (args[i] instanceof Error) {
        msg += args[i].toString()
      } else if (typeof args[i] === "object") {
        try {
          msg += JSON.stringify(args[i])
        } catch (stringifyError) {
          msg += args[i] + "(stringify fail: " + stringifyError + ")"
        }
      } else {
        msg += args[i]
      }

      msg += " "
    }

    if (__DEV__) {
      switch (level) {
        case "Error":
          console.error(msg)
          break

        case "Warn":
          console.info(msg) // react native yellow box
          break

        default:
          console.log(msg)
      }
    }

    if (this.dispatch) {
      this.dispatch(new ActionLog(msg))
    }

    return msg
  }

  logE(...args: any) {
    return this.log("Error", ...args)
  }

  logW(...args: any) {
    return this.log("Warn", ...args)
  }

  logI(...args: any) {
    return this.log("Info", ...args)
  }

  notify(notification: NotifyParams) {
    if (this.dispatch) {
      this.dispatch(new ActionNotify(notification))
    }
  }

  setReduxDispatch(d: Dispatch) {
    this.dispatch = d
  }
}

export const logger = new NotificationManager()
