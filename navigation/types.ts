import {NavigatorScreenParams} from "@react-navigation/native"

export type RootStackScreenParams = {
  Main: NavigatorScreenParams<MainScreenParams> | undefined
  Modal: undefined
}

export type MainScreenParams = {
  RoutesStack: undefined
  Drivers: undefined
  MoreStack: undefined
}
