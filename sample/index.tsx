import * as React from "react"

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {AfterLogin} from "./screens/after-login"
import {ProtectedScreen} from "../auth/components/protected-screen"

type ScreenParams = {
  AfterLogin: undefined
}

const RouteNav = createNativeStackNavigator<ScreenParams>()

export function SampleStack() {
  return (
    <ProtectedScreen>
      <RouteNav.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RouteNav.Screen name={"AfterLogin"} component={AfterLogin} />
      </RouteNav.Navigator>
    </ProtectedScreen>
  )
}
