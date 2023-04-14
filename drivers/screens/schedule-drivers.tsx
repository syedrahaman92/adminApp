import React from "react"
import {FlatList, StyleSheet, View} from "react-native"
import {Appbar, Text} from "react-native-paper"
import {ScheduledDriverInterval} from "../types"
import {ActivityIndicator} from "react-native-paper"
import {useDriverIntervals} from "../hooks/queries"
import {DriverIntervalsCard} from "../components/driver-intervals-card"
import {OurAppBarHeader} from "../../common/components/our-app-bar-header"
import {SafeAreaView} from "react-native-safe-area-context"

export default function ScheduleDrivers({navigation}: any) {
  const {isLoading, isError, data, error, refetch} = useDriverIntervals()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // This check is to prevent error on component mount. The refetch function is defined only after the query is run once
      // It also ensures that refetch runs only when you go back and not on component mount
      if (refetch) {
        // This will re-run the query
        refetch()
      }
    })

    return unsubscribe
  }, [navigation, refetch])

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: "center"}]}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={[styles.container, {justifyContent: "center"}]}>
        <Text onPressIn={undefined} onPressOut={undefined}>
          An error has occurred: {error?.message}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <OurAppBarHeader title="Drivers" hasBackAction={true}>
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </OurAppBarHeader>
      {data?.length ? (
        <FlatList
          data={data}
          renderItem={({item}: {item: ScheduledDriverInterval[]}) => (
            <DriverIntervalsCard driverIntervals={item} />
          )}
          keyExtractor={item => item[0].driverID.toString()}
        />
      ) : (
        <View style={{flex: 1, justifyContent: "center"}}>
          <Text style={{textAlign: "center"}}>No drivers</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
