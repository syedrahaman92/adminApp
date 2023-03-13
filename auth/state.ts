export const authDB = {
  userID: "",
  sessionPassword: "",
  smsNonce: "",
  phoneNum: "",
}

export const authRedux = {
  loggedIn: false,
  loginVisible: false,
  loginScreenText: " ",
  buttonDisabled: false,
  waitingForBrowser: false,
  provider: " ",
  username: "",
  notUnique: false,
  cityInfo: {
    name: "",
    locInfo: {
      lat: 0,
      lng: 0,
      formattedAddress: "",
      city: "",
      state: "",
      country: "",
    },
  },
  verificationStatus: "pending",
  verificationStatusForSignUp: {status: "pending", reason: ""},
  verificationStatusForSignIn: "pending",
  emailVerifyForResetPassword: "idle",
  verifyingEmail: "idle",
  forgotPasswordVerify: "idle",
  isEmailVerified: "idle",
  resetPassword: "idle",
  isVerfied: true,
}
