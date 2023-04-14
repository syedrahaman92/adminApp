import React from "react"
import {TouchableOpacity, View} from "react-native"
import {Text, Badge, Surface} from "react-native-paper"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import {useTheme} from "../../common/util"

type Props = {
  label: string
  subLabel?: string
  subLabelTextColor?: string
  badge?: number
  leftIcon: any
  leftIconColor?: string
  onPress?: () => void
  disabled?: boolean
  marginTop?: number
}

export const MenuItem = (props: Props) => {
  const currTheme = useTheme()
  const noop = () => {}

  return (
    <Surface
      style={{
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 10,
        elevation: 2,
      }}>
      <TouchableOpacity
        key={props.label}
        onPress={props.onPress ? props.onPress : noop}
        disabled={props.disabled}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: props.marginTop ? props.marginTop : 0,
        }}>
        <View style={{flexDirection: "row", alignItems: "flex-start"}}>
          <MaterialCommunityIcon
            size={24}
            name={props.leftIcon}
            // color={props.leftIconColor ? props.leftIconColor : currTheme.colors.grey02}
            style={{
              marginTop: -2,
              // opacity: props.disabled ? 0.5 : 1
            }}
          />
          <View style={{marginLeft: 16}}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 18,
                lineHeight: 21,
                // opacity: props.disabled ? 0.5 : 1,
                // color: currTheme.colors.grey02,
              }}>
              {props.label}
            </Text>
            {props.subLabel ? (
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  lineHeight: 19,
                  marginTop: 2,
                  // color: props.subLabelTextColor
                  //   ? props.subLabelTextColor
                  //   : currTheme.colors.grey300,
                  // opacity: props.disabled ? 0.5 : 1,
                }}>
                {props.subLabel}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {props.badge ? (
            <Badge
              size={24}
              style={{
                backgroundColor: currTheme.colors.primary,
                marginRight: 8,
              }}>
              {props.badge > 99 ? "99+" : props.badge}
            </Badge>
          ) : null}
          <MaterialCommunityIcon
            size={24}
            name={"chevron-right"}
            // color={currTheme.colors.grey400}
            // style={{opacity: props.disabled ? 0.5 : 1}}
          />
        </View>
      </TouchableOpacity>
    </Surface>
  )
}
