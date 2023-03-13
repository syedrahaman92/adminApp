import React, {useEffect} from "react"
import {View} from "react-native"
import {ActivityIndicator, HelperText, TextInput} from "react-native-paper"
import {ss} from "../styles"
import {usePrevious} from "../hooks"

export type Hint = {
  type: "error" | "info" | "loading" | "hidden"
  msg?: string
}

type ValidationProps = {
  hint: Hint
  setHint: (hint: Hint) => void
  setValue: (newValue: string) => void
  validator: (text: string, setHint: (hint: Hint) => void) => void
}

type Props = ValidationProps & React.ComponentProps<typeof TextInput>

const context = {
  latestValue: "",
}

export function ValidatedInput(props: Props) {
  const prevText = usePrevious(props.value)

  useEffect(() => {
    const prev = prevText ? prevText : ""
    const curr = props.value ? props.value : ""

    if (prev !== curr) {
      context.latestValue = curr
      props.validator(curr, (h: Hint) => {
        // capture current text field value being validated
        // in 'curr' and compare with latest value of field in
        // context. Only call setHint if validated value
        // is same as latest value of field. Otherwise, its
        // validation for an older value. This fixes issue
        // when user changes value faster than the async
        // validation can complete. E.g. when checking
        // user name availability
        if (curr === context.latestValue) {
          props.setHint(h)
        }
      })
    }
  })

  let inner = null

  if (props.hint.type === "loading") {
    inner = <ActivityIndicator animating={true} size="small" />
  } else if (props.hint.type === "error" || props.hint.type === "info") {
    inner = <HelperText type={props.hint.type}>{props.hint.msg}</HelperText>
  }

  return (
    <>
      <TextInput {...props} onChangeText={props.setValue} />
      <View style={[ss.flx_row, ss.minh, ss.mh]}>{inner}</View>
    </>
  )
}

export function isFormOK(formHints: Hint[]) {
  return formHints.every(h => h.type !== "error")
}
