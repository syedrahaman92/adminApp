// @flow

// Import the react-native-sound module
// var Sound = require("react-native-sound")
// const {logger} = require("../common/libs/logger")
import {config as c} from "./index"

export function playNotificationSound(soundName?: string) {
  soundName = soundName ? soundName : c.notificationSound // set a default if empty sound name
  // var notificationSound = new Sound(soundName, Sound.MAIN_BUNDLE, error => {
  //   if (error) {
  //     logger.logE("failed to load the sound", error)
  //     return
  //   }
  //   // loaded successfully
  //   notificationSound.play(success => {
  //     if (!success) {
  //       logger.logE("playback failed due to audio decoding errors")
  //     }
  //   })
  // })
}
