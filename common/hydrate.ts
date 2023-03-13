import {ActionHydrateLaunchedOnce} from "./actions/redux"
// import {getUniqueId} from "react-native-device-info"
import {dbState} from "./state"
import {load, updateStore} from "./db"
import type {StateChanger} from "./types"
import {locationCondition} from "./libs/task-queue/conditions"

export async function jobHydrateGeneralState(dispatch: StateChanger) {
  const generalState = await load("general")

  if (generalState) {
    dbState.general = generalState
  }

  if (dbState.general.lat !== 0 || dbState.general.lng !== 0) {
    locationCondition.satisfied(true)
  }

  // const deviceID = getUniqueId()
  // if (dbState.general.deviceID !== deviceID) {
  //   updateStore("general", {deviceID})
  // }

  if (!dbState.general.onlineOrderType || dbState.general.onlineOrderType !== "delivery") {
    updateStore("general", {onlineOrderType: "delivery"})
  }

  dispatch(new ActionHydrateLaunchedOnce(dbState.general.launchedOnce))
}
