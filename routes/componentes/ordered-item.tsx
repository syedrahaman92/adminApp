import React from "react"
import {OrderItem} from "../types"
import {View} from "react-native"
import {getItemOptions, getItemTotalPrice} from "../util"
import {Text} from "react-native-paper"
import {useTheme} from "../../common/util"

type Props = {
  orderedItem: OrderItem
  style?: any
  showPrice?: boolean
  currency?: string
}

export function OrderedItem(props: Props) {
  const {colors} = useTheme()
  let options = ""
  for (let i = 0; i < props.orderedItem.choices?.length; i++) {
    options = options + (options !== "" ? ", " : "") + props.orderedItem.choices[i].title
  }

  function ownerRenderChoices(option: {optionTitle: string; choices: string}, index: number) {
    return (
      <View style={{flexDirection: "row", marginTop: 4}} key={index.toString()}>
        {option.optionTitle === "Variations" ? (
          <Text style={{fontSize: 16}}>{"(" + option.choices + ")"}</Text>
        ) : (
          <Text style={{fontSize: 16}}>{option.optionTitle + " : " + option.choices}</Text>
        )}
      </View>
    )
  }

  return (
    <View style={[{flex: 1}]}>
      <View>
        {props.orderedItem.sectionName ? (
          <Text
            style={{
              marginLeft: 44,
              fontSize: 10,
              fontWeight: "bold",
              letterSpacing: 1.5,
            }}>
            {props.orderedItem.sectionName.toUpperCase()}
          </Text>
        ) : null}

        <View style={{marginTop: 4, marginBottom: 12, paddingBottom: 12}}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <View>
              <View
                style={{
                  borderWidth: 1,
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                }}>
                <Text style={{fontSize: 18, fontWeight: "700", color: colors.primary}}>
                  {props.orderedItem.quantity}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, marginLeft: 16, flexShrink: 1, marginRight: 4}}>
              <Text style={{fontSize: 18, fontWeight: "700"}}>{props.orderedItem.title}</Text>
              {props.orderedItem.choices?.length > 0
                ? getItemOptions(props.orderedItem.choices).map(ownerRenderChoices)
                : null}
            </View>
            {props.showPrice ? (
              <View style={{paddingTop: 3}}>
                <Text style={{}}>
                  {getItemTotalPrice(
                    props.orderedItem.price,
                    props.orderedItem.quantity
                  ).toFixed(2)}
                </Text>
              </View>
            ) : null}
          </View>

          {props.orderedItem.specialRequest ? (
            <View
              style={[
                {
                  padding: 15,
                  backgroundColor: colors.secondary,
                  marginTop: 10,
                  borderRadius: 4,
                },
              ]}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  letterSpacing: 1.5,
                  width: 124,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.primary,
                }}>
                SPECIAL REQUESTS:
              </Text>
              <Text style={[{marginTop: 8, fontSize: 14, fontWeight: "400"}]}>
                {props.orderedItem.specialRequest}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  )
}
