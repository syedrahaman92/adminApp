import * as React from "react"
import {StyleSheet, View} from "react-native"
import {ActivityIndicator, Button, Paragraph, Title} from "react-native-paper"

import {Text} from "react-native-paper"
import {TabScreen, Tabs, useTabIndex, useTabNavigation} from "react-native-paper-tabs"
import {useRecentRoutes} from "../hooks/queries"
import {RoutesContent} from "../componentes/routes-content"
import {ss} from "../../common/styles"
import {SafeAreaView} from "react-native-safe-area-context"

export function Routes() {
  const routesQ = useRecentRoutes()
  return (
    <SafeAreaView style={{flex: 1, marginTop: 16}} edges={["top", "left", "right"]}>
      <Tabs
        // defaultIndex={0} // default = 0
        uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="Latest">
          <View style={{flex: 1}}>
            {routesQ.isLoading ? (
              <View style={[ss.flx_i, ss.jcc, ss.aic]}>
                <ActivityIndicator />
              </View>
            ) : routesQ.data ? (
              <RoutesContent data={routesQ.data} />
            ) : null}
          </View>
        </TabScreen>
        <TabScreen label="Future">
          <View style={{backgroundColor: "black", flex: 1}} />
        </TabScreen>
        <TabScreen
          label="Inactive"
          // optional props
          // onPressIn={() => {
          //   console.log('onPressIn explore');
          // }}
          // onPress={() => {
          //   console.log('onPress explore');
          // }}
        >
          <View style={{backgroundColor: "red", flex: 1}} />
        </TabScreen>
      </Tabs>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
