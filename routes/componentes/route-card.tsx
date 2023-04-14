import * as React from "react"
import {View} from "react-native"
import {Card, Divider} from "react-native-paper"
import {Text} from "react-native-paper"
import {DeliveryRoute, RouteTask} from "../types"
import {useTheme} from "../../common/util"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import moment from "moment"

type Props = {
  route: DeliveryRoute
}

export function RouteCard({route}: Props) {
  const {colors} = useTheme()
  const uniqueTasks = [
    ...new Map(route.routeTasks.map(item => [item["orderID"], item])).values(),
  ]

  const showOrders = (item: RouteTask, index: number) => {
    const delayTime = () => {
      const pickupTime = moment(item.orderDetails.estimatedPickupTime)
      const currTime = moment()
      const duration = currTime.diff(pickupTime, "minute")
      const orderDelayMax = 10 //in min
      if (duration >= orderDelayMax && item.orderDetails.status === "accepted") {
        return duration
      } else {
        return 0
      }
    }
    return (
      <View key={index}>
        <Divider style={{marginVertical: 8}} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text variant="titleMedium">Order: {item.orderID}</Text>
            <Text variant="titleLarge" style={{marginHorizontal: 8}}>
              |
            </Text>
            <Text variant="bodyMedium" style={{color: colors.lightGreen}}>
              {item.orderDetails.status.toUpperCase()}
            </Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <MaterialCommunityIcons name="call-received" size={16} />
            <Text
              variant="bodyMedium"
              style={{
                marginLeft: 4,
                color: item.orderDetails.receivedByDevices.length ? undefined : colors.error,
              }}>
              Received: {item.orderDetails.receivedByDevices.length}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text variant="bodyMedium">
            Created: {moment(item.orderDetails.createdAt).format("hh:mm a")}
          </Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
          <Text variant="bodyMedium">
            Pickup: {moment(item.orderDetails.estimatedPickupTime).format("hh:mm a")}
          </Text>
          {delayTime() ? <Text variant="bodyMedium">Delay: {delayTime()} min</Text> : null}
        </View>
      </View>
    )
  }
  return (
    <Card style={{marginHorizontal: 16, marginTop: 8, borderRadius: 16}}>
      <Card.Content>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text variant="titleMedium">Route: {route.routeID}</Text>
          <Text variant="titleLarge" style={{marginHorizontal: 8}}>
            |
          </Text>
          <View style={{flex: 1}}>
            {route.driverID ? (
              <Text variant="bodyMedium" style={{}}>
                Driver: {route.driverName}
              </Text>
            ) : (
              <Text variant="bodyMedium" style={{color: colors.error}}>
                No driver assigned
              </Text>
            )}
          </View>
        </View>
        {uniqueTasks.map(showOrders)}
      </Card.Content>
    </Card>
  )
}
