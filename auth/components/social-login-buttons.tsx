import React from "react"
import {View} from "react-native"
import {IconButton} from "react-native-paper"
import {ss} from "../../common/styles"
import {SocialLoginProvider} from "../actions/interactions"

const SOCIAL_ICON_SIZE = 30

type Props = {
  beginOAuth: (providerName: SocialLoginProvider) => void
}

export function SocialLoginButtons({beginOAuth}: Props) {
  return (
    <View style={[ss.flx_row, ss.jcsb]}>
      <IconButton
        style={[ss.flx_i, ss.mhxxs]}
        icon="apple"
        size={SOCIAL_ICON_SIZE}
        onPress={() => beginOAuth("Apple")}
      />
      <IconButton
        style={[ss.flx_i, ss.mhxxs]}
        icon="google"
        size={SOCIAL_ICON_SIZE}
        onPress={() => beginOAuth("Google")}
      />
      <IconButton
        style={[ss.flx_i, ss.mhxxs]}
        icon="facebook"
        size={SOCIAL_ICON_SIZE}
        onPress={() => beginOAuth("Facebook")}
      />
    </View>
  )
}
