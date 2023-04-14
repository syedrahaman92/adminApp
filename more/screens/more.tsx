import * as React from "react"
import {ScrollView, View} from "react-native"
import {Avatar, Text} from "react-native-paper"
import {SafeAreaView} from "react-native-safe-area-context"
import {MenuItem} from "../componentes/menu-item"

export function More() {
  return (
    <SafeAreaView style={{flex: 1, marginTop: 16}} edges={["top", "left", "right"]}>
      <ScrollView>
        <View style={{flexDirection: "row", marginHorizontal: 16, alignItems: "center"}}>
          <Avatar.Icon icon={"face-man-profile"} />
          <Text variant="titleLarge" style={{marginLeft: 16, fontWeight: "bold"}}>
            Hello Admin
          </Text>
        </View>
        <View style={{marginHorizontal: 16, marginTop: 30}}>
          <MenuItem label="Enable Disable Eatery" leftIcon={"power-settings"} />
          <MenuItem label="Logout" leftIcon={"logout"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
