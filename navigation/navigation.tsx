/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import * as React from "react"

import {useTheme} from "../common/util"
import ModalScreen from "../modals/modal-screen"
import {RoutesStack} from "../routes"
import {RootStackScreenParams, MainScreenParams} from "./types"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {useAppSelector} from "../common/hooks"
import {AuthNavigator} from "../auth"
import {MoreStack} from "../more"
import {DriverStack} from "../drivers"

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator<RootStackScreenParams>()

export function RootNavigator() {
  const loggedIn = useAppSelector(state => state.auth.loggedIn)
  if (loggedIn) {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <RootStack.Group screenOptions={{presentation: "modal"}}>
          <RootStack.Screen name="Modal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    )
  } else {
    return <AuthNavigator />
  }
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<MainScreenParams>()

function BottomTabNavigator() {
  const currTheme = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="RoutesStack"
      backBehavior={"initialRoute"}
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          elevation: 4,
        },
      })}>
      <BottomTab.Screen
        name="RoutesStack"
        component={RoutesStack}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="map-marker-path" color={color} />,
          title: "Routes",
        }}
      />
      <BottomTab.Screen
        name="Drivers"
        component={DriverStack}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="moped-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MoreStack"
        component={MoreStack}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="menu" color={color} />,
          title: "More",
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  color: string
}) {
  return <MaterialCommunityIcons size={30} style={{marginBottom: -3}} {...props} />
}
