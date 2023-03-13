import {updateStore} from "../common/db"
import {ActionLogout} from "./actions/redux"
import {authCondition} from "../common/libs/task-queue/conditions"
import {dbState} from "../common/state"
import {reduxStore} from "../common/libs/init"

export function showSpinner(verificationStatus: string) {
  return (
    verificationStatus === "started" ||
    verificationStatus === "success" ||
    verificationStatus === "loggedin"
  )
}

export function logout() {
  authCondition.satisfied(false)
  reduxStore.dispatch(new ActionLogout())
  updateStore("auth", {
    sessionPassword: "",
    userID: "",
  })
}

export function getLoginState() {
  return dbState.auth
}

export function getUserIDInt(): number {
  const userID = parseInt(getLoginState().userID, 10)

  if (isUserLoggedIn() && !isNaN(userID)) {
    return userID
  }

  return -1
}

export function isUserLoggedIn(): boolean {
  const loginState = getLoginState()
  return loginState.userID && loginState.sessionPassword ? true : false
}
