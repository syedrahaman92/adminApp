import * as React from "react"
import {FlatList, View} from "react-native"
import {RouteCard} from "./route-card"
import {DeliveryRoute} from "../types"

type Props = {
  data: DeliveryRoute[]
}

export function RoutesContent({data}: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}: {item: DeliveryRoute}) => <RouteCard route={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
