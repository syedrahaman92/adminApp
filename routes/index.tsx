import * as React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {Routes} from "./screens/routes"
import {RouteDetails} from "./screens/route-details"

type ScreenParams = {
  Routes: undefined
  RouteDetails: undefined
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
      <RouteNav.Screen name={"RouteDetails"} component={RouteDetails} />
    </RouteNav.Navigator>
    // </ProtectedScreen>
  )
}
