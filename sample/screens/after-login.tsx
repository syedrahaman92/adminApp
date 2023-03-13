import * as React from "react"
import {StyleSheet, View} from "react-native"
import {Button} from "react-native-paper"

import {Text} from "react-native-paper"

export function AfterLogin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Content</Text>
      <View style={styles.separator} />
      <Button icon="camera" mode="contained" onPress={() => console.log("hello world")}>
        Press me
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
