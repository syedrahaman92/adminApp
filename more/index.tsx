import * as React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {More} from "./screens/more"

type ScreenParams = {
  More: undefined
}

const RouteNav = createNativeStackNavigator<ScreenParams>()

export function MoreStack() {
  return (
    // <ProtectedScreen>
    <RouteNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RouteNav.Screen name={"More"} component={More} />
    </RouteNav.Navigator>
    // </ProtectedScreen>
  )
}
