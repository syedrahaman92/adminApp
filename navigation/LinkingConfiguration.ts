/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from "@react-navigation/native"

import {RootStackScreenParams} from "./types"

const linking: LinkingOptions<RootStackScreenParams> = {
  prefixes: [""],
  config: {
    screens: {
      Main: {
        screens: {
          Sample: {
            screens: {
              AfterLogin: "afterlogin",
            },
          },
          Drivers: "drivers",
        },
      },
      Modal: "modal",
    },
  },
}

export default linking
