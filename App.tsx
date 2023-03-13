import React from "react"
import {Provider as PaperProvider} from "react-native-paper"
import {QueryClientProvider} from "react-query"

import {useTheme} from "./common/util"
import {RootNavigator} from "./navigation/navigation"

import {NavigationContainer} from "@react-navigation/native"

import LinkingConfiguration from "./navigation/LinkingConfiguration"
import {SafeAreaProvider} from "react-native-safe-area-context"

import {Provider} from "react-redux"

import {queryClient, reduxStore} from "./common/libs/init"
import {SplashScreen} from "./splash"
import {useAppHydrating} from "./common/hooks/hydration"

// main app entry point
export default function App() {
  const currTheme = useTheme()

  const isAppHydrating = useAppHydrating()

  if (isAppHydrating) {
    // show splash screen
    return <SplashScreen />
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={currTheme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={reduxStore}>
            <NavigationContainer linking={LinkingConfiguration} theme={currTheme}>
              <RootNavigator />
            </NavigationContainer>
          </Provider>
        </QueryClientProvider>
        {/* <StatusBar /> */}
      </PaperProvider>
    </SafeAreaProvider>
  )
}
