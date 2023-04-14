import React from "react"
import {FlatList, StyleSheet, View} from "react-native"
import {Appbar, List, Text} from "react-native-paper"
import {ScheduledDriverInterval} from "../types"
import {ActivityIndicator} from "react-native-paper"
import {useDriverIntervals} from "../hooks/queries"
import {DriverIntervalsCard} from "../components/driver-intervals-card"
import {OurAppBarHeader} from "../../common/components/our-app-bar-header"
import {SafeAreaView} from "react-native-safe-area-context"
import {useTheme} from "../../common/util"

export default function DriverSettings({navigation}: any) {
  const {colors} = useTheme()
  return (
    <SafeAreaView style={{flex: 1, marginTop: 16}}>
      <View style={{marginHorizontal: 16}}>
        <Text variant="titleLarge" style={{textAlign: "center", fontWeight: "700"}}>
          Driver Settings
        </Text>

        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="clock-outline" style={{marginLeft: 0}} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={{
            borderTopWidth: 1,
            marginTop: 24,
            paddingRight: 0,
            paddingVertical: 12,
            borderColor: colors.outlineVariant,
          }}
          titleStyle={{fontWeight: "bold"}}
        />
        <List.Item
          title="First Item"
          left={props => (
            <List.Icon {...props} icon="human-capacity-increase" style={{marginLeft: 0}} />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={{
            borderTopWidth: 1,
            paddingRight: 0,
            paddingVertical: 12,
            borderColor: colors.outlineVariant,
          }}
          titleStyle={{fontWeight: "bold"}}
        />
        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="send" style={{marginLeft: 0}} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={{
            borderTopWidth: 1,
            paddingRight: 0,
            paddingVertical: 12,
            borderColor: colors.outlineVariant,
          }}
          titleStyle={{fontWeight: "bold"}}
        />
        <List.Item
          title="First Item"
          left={props => (
            <List.Icon {...props} icon="book-clock-outline" style={{marginLeft: 0}} />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={{
            borderTopWidth: 1,
            paddingRight: 0,
            paddingVertical: 12,
            borderColor: colors.outlineVariant,
          }}
          titleStyle={{fontWeight: "bold"}}
        />
      </View>
    </SafeAreaView>
  )
}
