import * as React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {LoginScreen} from "./screens/login"
import {UsernameAuthScreen} from "./screens/username-auth"
// import {PhoneAuthScreen} from "./phone-auth"
// import {VerifyCodeScreen} from "./verify-code"
// import {UsernameAuthScreen} from "./username-auth"
// import {SignUpScreen} from "./sign-up-screen"
// import {ForgotPasswordEmailScreen} from "./forgot-password-email"
// import {ForgotPasswordVerifyScreen} from "./forgot-password-verify"
// import {ResetPasswordScreen} from "./reset-password"

const AuthStack = createNativeStackNavigator()

export function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <AuthStack.Screen name={"Login"} component={LoginScreen} /> */}
      {/* <AuthStack.Screen name={"PhoneAuth"} component={PhoneAuthScreen} />
      <AuthStack.Screen name={"VerifyCode"} component={VerifyCodeScreen} />*/}
      <AuthStack.Screen name={"UsernameAuth"} component={UsernameAuthScreen} />
      {/* <AuthStack.Screen name={"SignUp"} component={SignUpScreen} />
      <AuthStack.Screen name={"ForgotPasswordEmail"} component={ForgotPasswordEmailScreen} />
      <AuthStack.Screen name={"ForgotPasswordVerify"} component={ForgotPasswordVerifyScreen} />
      <AuthStack.Screen name={"ResetPassword"} component={ResetPasswordScreen} /> */}
    </AuthStack.Navigator>
  )
}
