import React, {useState} from "react"
import {View, Keyboard, Alert, ActivityIndicator} from "react-native"
import {useAppDispatch} from "../../common/hooks"
import {useTheme} from "../../common/util"
import {dbState} from "../../common/state"
import {store} from "../../common/db"
import {OurAppBarHeader} from "../../common/components/our-app-bar-header"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {ss} from "../../common/styles"
import {Button, Text, TextInput} from "react-native-paper"
import {ActionLoggedIn} from "../actions/redux"
import {authCondition} from "../../common/libs/task-queue/conditions"
import {config as c} from "../../config"

export function UsernameAuthScreen({navigation}: any) {
  const dispatch = useAppDispatch()
  const currTheme = useTheme()
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [isSecure, setIsSecure] = useState(true)
  const [loginStatus, setLoginStatus] = useState<"idle" | "processing" | "success" | "failed">(
    "idle"
  )

  const credVerification = () => {
    if (signInEmail && signInPassword) {
      setLoginStatus("processing")
      Keyboard.dismiss()

      if (signInEmail === c.username && signInPassword === c.password) {
        setLoginStatus("success")
        store(
          "auth",
          Object.assign(dbState.auth, {
            userID: signInEmail,
            sessionPassword: signInPassword,
          })
        )
        dispatch(new ActionLoggedIn())
        authCondition.satisfied(true)
      } else {
        setLoginStatus("failed")
      }
    } else {
      Alert.alert("All fields are mandetory")
    }
  }

  return (
    <>
      <OurAppBarHeader title="Sign in" hasBackAction={false} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={[ss.flx_i, ss.jcc, ss.phxs]}>
          <TextInput
            label={"Username/Email"}
            keyboardType="email-address"
            autoComplete="off"
            value={signInEmail}
            onChangeText={signInEmail => setSignInEmail(signInEmail)}
            style={[ss.mh, ss.mt]}
            mode="outlined"
          />
          <TextInput
            label={"Password"}
            autoComplete="off"
            value={signInPassword}
            onChangeText={signInPassword => setSignInPassword(signInPassword)}
            style={[ss.mh, ss.mt]}
            mode="outlined"
            secureTextEntry={isSecure}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  if (isSecure === true) {
                    setIsSecure(false)
                  } else {
                    setIsSecure(true)
                  }
                }}
              />
            }
          />

          {loginStatus === "processing" ? (
            <ActivityIndicator size="small" style={{marginTop: 10}} />
          ) : null}
          {loginStatus === "failed" ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "normal",
                color: currTheme.colors.error,
                textAlign: "center",
                marginTop: 15,
              }}>
              {"Incorrect username/password provided"}
            </Text>
          ) : null}
          <Button
            mode="contained"
            style={[ss.mh, ss.mt]}
            onPress={credVerification}
            disabled={
              signInEmail.length === 0 ||
              signInPassword.length === 0 ||
              loginStatus === "processing"
                ? true
                : false
            }>
            {loginStatus === "processing" ? "Logging in..." : "SUBMIT"}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}
