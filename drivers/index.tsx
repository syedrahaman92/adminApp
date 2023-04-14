import * as React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import DriverSettings from "./screens/driver-settings"
import ScheduleDrivers from "./screens/schedule-drivers"

type ScreenParams = {
  DriverSettings: undefined
  ScheduleDrivers: undefined
}

const RouteNav = createNativeStackNavigator<ScreenParams>()

export function DriverStack() {
  return (
    // <ProtectedScreen>
    <RouteNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RouteNav.Screen name={"DriverSettings"} component={DriverSettings} />
      <RouteNav.Screen name={"ScheduleDrivers"} component={ScheduleDrivers} />
    </RouteNav.Navigator>
    // </ProtectedScreen>
  )
}
