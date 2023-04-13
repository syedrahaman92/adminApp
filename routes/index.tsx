import * as React from "react"

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {Routes} from "./screens/routes"

type ScreenParams = {
  Routes: undefined
}

const RouteNav = createNativeStackNavigator<ScreenParams>()

export function RoutesStack() {
  return (
    // <ProtectedScreen>
    <RouteNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RouteNav.Screen name={"Routes"} component={Routes} />
    </RouteNav.Navigator>
    // </ProtectedScreen>
  )
}
