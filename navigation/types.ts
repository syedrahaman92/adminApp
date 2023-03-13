import {NavigatorScreenParams} from "@react-navigation/native"

export type RootStackScreenParams = {
  Main: NavigatorScreenParams<MainScreenParams> | undefined
  Modal: undefined
}

export type MainScreenParams = {
  Sample: undefined
  Drivers: undefined
}
