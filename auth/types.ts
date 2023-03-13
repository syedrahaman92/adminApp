export const LoginSchema = {
  name: "Login",
  primaryKey: "id",
  properties: {
    id: "string",
    userID: "string",
    sessionPassword: "string",
    smsNonce: "string",
    phoneNum: "string",
  },
}
export type StoredLoginKey = typeof LoginSchema.properties
export type AuthCodeVerificationStatus =
  | "started"
  | "success"
  | "failed"
  | "pending"
  | "loggedin"

export type EmailSignupResponse = {
  userID: number
  sessionPassword: string
  name: string
  signUpEmail: string
  isEmailVerified: boolean
  signUp?: any
}

export type EmailLoginResponse = {
  userID: number
  sessionPassword: string
  name: string
  userName: string
  city: string
  state: string
  country: string
  alternatePhone: string
  alternateEmail: string
  loginEmail: string
  isEmailVerified: boolean
  passwordSignIn?: any
}

export type VerificationStatusStates =
  | "failed"
  | "idle"
  | "pending"
  | "started"
  | "success"
  | "updating"
