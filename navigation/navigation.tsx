/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import * as React from "react"

import {useTheme} from "../common/util"
import ModalScreen from "../modals/modal-screen"
import {SampleStack} from "../sample"
import DriversScreen from "../drivers/drivers"
import {RootStackScreenParams, MainScreenParams} from "./types"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator<RootStackScreenParams>()

export function RootNavigator() {
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
      initialRouteName="Sample"
      shifting={true}
      activeColor={currTheme.colors.primary}
      barStyle={{backgroundColor: currTheme.colors.surface}}>
      <BottomTab.Screen
        name="Sample"
        component={SampleStack}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="lock" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Drivers"
        component={DriversScreen}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="group" color={color} />,
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
  return <MaterialCommunityIcons size={20} style={{marginBottom: -3}} {...props} />
}
