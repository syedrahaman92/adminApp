import {Action} from "../../common/libs/structured-actions"
import {AppState} from "../../common/types"
import {DeliveryRoute} from "../types"

export class ActionSetRouteDetails extends Action<DeliveryRoute> {
  reduce(state: AppState) {
    state.route.routeDetails = this.params
  }
}
