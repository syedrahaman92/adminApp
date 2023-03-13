import {AppState} from "../types"
import {Action} from "../libs/structured-actions"

export class ActionHydrateLaunchedOnce extends Action<boolean> {
  reduce(appState: AppState) {
    appState.app.launchedOnce = this.params
  }
}
