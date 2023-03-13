import {AppState} from "../../../types"
import {Action} from "../../structured-actions"

export class ActionSetNetworkAvailable extends Action<boolean> {
  reduce(state: AppState) {
    state.app.networkStatus = this.params === true ? "success" : "fail"
  }
}

export class ActionSetLocationStatus extends Action<boolean> {
  reduce(state: AppState) {
    state.app.locationUpdateStatus = this.params === true ? "success" : "fail"
  }
}
