import React, {useState} from "react"
import {View, Keyboard, Alert, ActivityIndicator} from "react-native"
import {useAppDispatch} from "../../common/hooks"
import {useTheme} from "../../common/util"
import {dbState} from "../../common/state"
import {store} from "../../common/db"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {ss} from "../../common/styles"
import {Button, Text, TextInput} from "react-native-paper"
import {ActionLoggedIn} from "../actions/redux"
import {authCondition} from "../../common/libs/task-queue/conditions"
import {config as c} from "../../config"
import {SafeAreaView} from "react-native-safe-area-context"

export function UsernameAuthScreen({navigation}: any) {
  const dispatch = useAppDispatch()
  const currTheme = useTheme()
  const [username, setUsername] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [isSecure, setIsSecure] = useState(true)
  const [loginStatus, setLoginStatus] = useState<"idle" | "processing" | "success" | "failed">(
    "idle"
  )

  const credVerification = () => {
    if (username && signInPassword) {
      setLoginStatus("processing")
      Keyboard.dismiss()

      if (username === c.username && signInPassword === c.password) {
        setLoginStatus("success")
        store(
          "auth",
          Object.assign(dbState.auth, {
            userID: username,
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
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[ss.flx_i, ss.jcc]}>
          <Text variant="labelLarge" style={[ss.mh, ss.mt]}>
            Sign In
          </Text>
          <TextInput
            label={"Username"}
            keyboardType="email-address"
            autoComplete="off"
            value={username}
            onChangeText={username => setUsername(username)}
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
                icon="eye"
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
              username.length === 0 ||
              signInPassword.length === 0 ||
              loginStatus === "processing"
                ? true
                : false
            }>
            {loginStatus === "processing" ? "Logging in..." : "SUBMIT"}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
