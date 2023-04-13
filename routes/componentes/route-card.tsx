import * as React from "react"
import {StyleSheet, View} from "react-native"
import {Avatar, Button, Card, Divider} from "react-native-paper"
import {Text} from "react-native-paper"

type Props = {
  route: any
}
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export function RouteCard({route}: Props) {
  return (
    <Card style={{marginHorizontal: 16, marginTop: 8, borderRadius: 16}}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text variant="titleLarge">Route: {route.routeID}</Text>
          <Text variant="titleLarge"> | </Text>
          <Text variant="bodyMedium">No driver assigned</Text>
        </View>
        <Divider style={{marginVertical: 8}} />
        <View style={{flexDirection: "row"}}>
          <Text variant="titleLarge">Order: 15845</Text>
          <Text variant="titleLarge"> | </Text>
          <Text variant="bodyMedium">Accepted</Text>
          <Text variant="bodyMedium">Received: 1</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text variant="bodyMedium">Created: 2:16 Am</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
          <Text variant="bodyMedium">Pickup : 2:26 Am</Text>
          <Text variant="bodyMedium">Delay: 10min</Text>
        </View>
      </Card.Content>
      {/* <Card.Cover source={{uri: "https://picsum.photos/700"}} /> */}
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
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
