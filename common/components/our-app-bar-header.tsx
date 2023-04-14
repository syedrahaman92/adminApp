import React from "react"
import {Appbar} from "react-native-paper"
import {useTheme} from "../util"
import {ViewStyle, StyleSheet} from "react-native"
import {useNavigation} from "@react-navigation/native"

type OurAppBarHeaderProps = {
  title: string
  subtitle?: string
  hasBackAction: boolean
  children?: React.ReactNode
  customBackAction?: () => void
}

export function OurAppBarHeader(props: OurAppBarHeaderProps) {
  const currTheme = useTheme()
  const navigation = useNavigation()

  return (
    <Appbar.Header
      style={[
        s.AppbarHeader,
        {
          backgroundColor: currTheme.colors.background,
        },
      ]}
      statusBarHeight={20}>
      <Appbar.BackAction
        size={20}
        style={[s.BackAction, props.hasBackAction ? {} : {width: 0}]}
        onPress={props.customBackAction ? props.customBackAction : () => navigation.goBack()}
      />
      <Appbar.Content
        style={s.AppbarContent}
        title={props.title}
        titleStyle={s.AppbarTitle}
        subtitle={props.subtitle}
        subtitleStyle={s.AppbarSubtitle}
      />
      {props.children}
    </Appbar.Header>
  )
}

const s = StyleSheet.create<{[key: string]: ViewStyle}>({
  BackAction: {
    width: 40,
    height: 40,
    margin: 0,
  },
  AppbarContent: {alignItems: "flex-start", paddingHorizontal: 0, marginLeft: 16},
  AppbarTitle: {fontSize: 28, fontWeight: "bold"},
  AppbarSubtitle: {fontSize: 16},
  AppbarHeader: {
    marginTop: 16,
    elevation: 0,
    marginBottom: 8,
  },
})
