import React from "react"
import {View} from "react-native"
import {ss} from "../../common/styles"
import {ActivityIndicator, Text} from "react-native-paper"
import {LoginStatusT} from "../actions/interactions"

export function LoginStatus(props: LoginStatusT) {
  return (
    <View style={[ss.mt, ss.cc]}>
      <ActivityIndicator animating={props.msg !== " " ? true : false} size="small" />
      <Text style={[ss.mts]}>{props.msg}</Text>
    </View>
  )
}
