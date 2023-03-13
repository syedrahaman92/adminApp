import {authCondition} from "../common/libs/task-queue/conditions"
import {load} from "../common/db"
import {dbState} from "../common/state"
import {ActionLoggedIn} from "./actions/redux"
import {StateChanger} from "../common/types"

export async function jobHydrateLoginScreenState(dispatch: StateChanger) {
  const authState = await load("auth")

  if (authState) {
    dbState.auth = authState
  }

  if (dbState.auth.userID && dbState.auth.sessionPassword) {
    authCondition.satisfied(true)
    dispatch(new ActionLoggedIn())
  } else {
    authCondition.satisfied(false)
  }
}
