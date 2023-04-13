import * as React from "react"
import {FlatList, StyleSheet, View} from "react-native"
import {RouteCard} from "./route-card"

type Props = {
  data: any[]
}

export function RoutesContent({data}: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}: {item: any}) => <RouteCard route={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
