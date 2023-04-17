import * as React from "react"
import {StyleSheet, View} from "react-native"
import {ActivityIndicator, Button, Divider, List, Paragraph, Title} from "react-native-paper"

import {Text} from "react-native-paper"
import {TabScreen, Tabs, useTabIndex, useTabNavigation} from "react-native-paper-tabs"
import {useRecentRoutes} from "../hooks/queries"
import {RoutesContent} from "../componentes/routes-content"
import {ss} from "../../common/styles"
import {SafeAreaView} from "react-native-safe-area-context"
import {OurAppBarHeader} from "../../common/components/our-app-bar-header"
import {useAppSelector} from "../../common/hooks"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {RouteTask} from "../types"
import {useTheme} from "../../common/util"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import moment from "moment"
import {getSeparateItems} from "../util"
import {OrderedItem} from "../componentes/ordered-item"

export function RouteDetails() {
  const {colors} = useTheme()
  const routeDetails = useAppSelector(state => state.route.routeDetails)
  const uniqueTasks = [
    ...new Map(routeDetails.routeTasks.map(item => [item["orderID"], item])).values(),
  ]

  const renderOrderItem = (item, index, foodOrder) => {
    return (
      <OrderedItem
        orderedItem={item}
        showPrice={true}
        currency={foodOrder ? foodOrder.currency : ""}
        style={[
          index === foodOrder.items?.length - 1
            ? null
            : {borderBottomWidth: 1, borderColor: colors.border},
        ]}
        key={index}
      />
    )
  }

  const showAllOrders = (item: RouteTask, index: number) => {
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
      <View key={index} style={{marginTop: 16}}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.outlineVariant,
          }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text variant="titleMedium">Order: {item.orderID}</Text>
            <Text style={{marginHorizontal: 8}}>|</Text>
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
        <List.AccordionGroup>
          <List.Accordion title="Order Timings" id="1">
            <View style={{marginHorizontal: 16, marginVertical: 12}}>
              <Text variant="bodyMedium">
                Created: {moment(item.orderDetails.createdAt).format("hh:mm a")}
              </Text>
              <View
                style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <Text variant="bodyMedium">
                  Pickup: {moment(item.orderDetails.estimatedPickupTime).format("hh:mm a")}
                </Text>
                {delayTime() ? (
                  <Text variant="bodyMedium">Delay: {delayTime()} min</Text>
                ) : null}
              </View>
            </View>
          </List.Accordion>
          <List.Accordion title="Order Contents" id="2">
            <View style={{marginHorizontal: 16, marginVertical: 12}}>
              {item.orderDetails.items.map((value, index) =>
                renderOrderItem(value, index, item.orderDetails)
              )}
            </View>
          </List.Accordion>
          <List.Accordion title="Driver Earnings & Pickup Eatery" id="3">
            <List.Item title="Item 3" />
          </List.Accordion>
          <List.Accordion title="Delivery At" id="4">
            <List.Item title="Item 2" />
          </List.Accordion>
          <List.Accordion title="Customer Details" id="5">
            <List.Item title="Item 2" />
          </List.Accordion>
          <List.Accordion title="Expires At" id="6">
            <List.Item title="Item 2" />
          </List.Accordion>
          <List.Accordion title="Failure Reason" id="7">
            <List.Item title="Item 2" />
          </List.Accordion>
        </List.AccordionGroup>
        <Button
          style={{marginTop: 12, marginHorizontal: 16, backgroundColor: colors.secondary}}
          mode="contained">
          Cancel order
        </Button>
        <View style={{flexDirection: "row", marginVertical: 12, alignItems: "center"}}>
          <Divider style={{flex: 1}} />
          <Text style={{flex: 1, marginHorizontal: 10}}>End of this order</Text>
          <Divider style={{flex: 1}} />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{flex: 1, marginTop: 16}} edges={["left", "right"]}>
      <OurAppBarHeader title="Route Details" hasBackAction />
      <KeyboardAwareScrollView>
        <View style={{marginHorizontal: 16, marginTop: 12}}>
          <Text variant="titleMedium">Route: {routeDetails.routeID}</Text>
          <View style={{flexDirection: "row", marginTop: 12, alignItems: "center"}}>
            <Text variant="bodyLarge" style={{}}>
              Assigned Driver:
            </Text>
            <Text variant="bodyMedium" style={{marginLeft: 8, flex: 1}}>
              {routeDetails.driverName}({routeDetails.driverID})
            </Text>
          </View>
          <Button style={{marginTop: 12}} mode="contained">
            Reassign Driver
          </Button>
        </View>
        {uniqueTasks.map(showAllOrders)}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
