import * as React from "react"
import {FlatList, View} from "react-native"
import {RouteCard} from "./route-card"
import {DeliveryRoute} from "../types"

type Props = {
  data: DeliveryRoute[]
  navigation: any
}

export function RoutesContent({data, navigation}: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}: {item: DeliveryRoute}) => (
          <RouteCard route={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
