import type {AppState} from "../../common/types"
import {Action} from "../../common/libs/structured-actions"
import type {AuthCodeVerificationStatus, VerificationStatusStates} from "../types"

export class ActionLoginVisible extends Action<boolean> {
  reduce(appState: AppState) {
    appState.auth.loginVisible = this.params
  }
}

export class ActionLogout extends Action {
  reduce(appState: AppState) {
    appState.auth.loginScreenText = " "
    appState.auth.waitingForBrowser = false
    appState.auth.buttonDisabled = false
    appState.auth.loggedIn = false
  }
}

export class ActionLoggedIn extends Action {
  reduce(appState: AppState) {
    appState.auth.loggedIn = true
  }
}

type LoginStatusParams = {
  msg: string
  buttonDisabled?: boolean
  waitingForBrowser?: boolean
}
export class ActionLoginStatus extends Action<LoginStatusParams> {
  reduce(appState: AppState) {
    appState.auth.loginScreenText = this.params.msg
    appState.auth.buttonDisabled = this.params.buttonDisabled ? true : false
    appState.auth.waitingForBrowser = this.params.waitingForBrowser ? true : false
  }
}
export class ActionSetPhoneInputTitle extends Action<string> {
  reduce(appState: AppState) {
    appState.phoneInputTitle = this.params
  }
}

export class ActionSetEmailValidation extends Action<string> {
  reduce(appState: AppState) {
    appState.emailValidation = this.params
  }
}

export class ActionSetVerificationStatus extends Action<AuthCodeVerificationStatus> {
  reduce(appState: AppState) {
    appState.auth.verificationStatus = this.params
  }
}

export class ActionSetVerificationStatusForSignUp extends Action<{
  status: AuthCodeVerificationStatus
  reason: string
}> {
  reduce(appState: AppState) {
    appState.auth.verificationStatusForSignUp = this.params
  }
}

export class ActionSetVerificationStatusForSignIn extends Action<AuthCodeVerificationStatus> {
  reduce(appState: AppState) {
    appState.auth.verificationStatusForSignIn = this.params
  }
}

export class ActionSetOTPVerifyStatus extends Action<VerificationStatusStates> {
  reduce(appState: AppState) {
    appState.auth.forgotPasswordVerify = this.params
  }
}

export class ActionSetVerifyStatusIfEmailIsVerified extends Action<VerificationStatusStates> {
  reduce(appState: AppState) {
    appState.auth.isEmailVerified = this.params
  }
}

export class ActionSetResettPasswordStatus extends Action<VerificationStatusStates> {
  reduce(appState: AppState) {
    appState.auth.resetPassword = this.params
  }
}

export class ActionSetVerificationStatusForResettingPassword extends Action<VerificationStatusStates> {
  reduce(appState: AppState) {
    appState.auth.emailVerifyForResetPassword = this.params
  }
}

export class ActionSetVerificationStatusForVerifyingEmail extends Action<VerificationStatusStates> {
  reduce(appState: AppState) {
    appState.auth.verifyingEmail = this.params
  }
}

export class ActionEmailVerifyState extends Action<boolean> {
  reduce(state: AppState) {
    state.auth.isVerfied = this.params
  }
}
