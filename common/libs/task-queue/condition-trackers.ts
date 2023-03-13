import {locationCondition, netCondition} from "./conditions"
import type {StateChanger} from "../../types"
import {ActionSetNetworkAvailable, ActionSetLocationStatus} from "./actions/redux"

export class ConditionTrackers {
  dispatch: StateChanger
  // will be called each time status changes of location
  trackLocationAvailability = () => {
    this.dispatch(new ActionSetLocationStatus(locationCondition.isTrue()))
  }
  // will be called each time status changes of network
  trackNetworkAvailability = () => {
    // this action sets a variable in redux state so that it is available
    // to the rest of the UI
    this.dispatch(new ActionSetNetworkAvailable(netCondition.isTrue()))
  }

  constructor(dispatch: StateChanger) {
    this.dispatch = dispatch
    locationCondition.registerListener(this.trackLocationAvailability)
    netCondition.registerListener(this.trackNetworkAvailability)
  }
}
