//@flow

import type {StateChanger} from "../common/types"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
// import {jobStoreFcmNotification} from "../notifications/background-jobs"
import {jobFetchPushNotifications} from "../notifications/server-notification"
import {navigate} from "../nav"
import {AuthTasks} from "../common/libs/task-queue/tasks"
import {ActionShowToastView} from "../our-components/actions"
import {DefaultToastInnerComponent} from "../our-components/toast-view"
import React from "react"
import {logger} from "../common/libs/logger"
import {StaticImages} from "../images/index"
import {
  jobCancelScheduledOrderWaitNotif,
  jobStoreNotifChatMessage,
  jobMergeIncomingOrders,
  jobCancelLocalReminderNotif,
  getPlaceFromOrderNotif,
} from "../order-management/background-jobs"
import {config as c} from "../config"
import {ActionOrdersChanged, ActionSetCurrPlace} from "../order-management/actions"
import {jobSwitchOrderAcceptanceScreen} from "../driver-screen/background-jobs"
import {jobMergeCloudList} from "../kart-lists-screen/background-jobs"
import {ActionSetListName} from "../kart-lists-screen/actions"
import {getUserIDInt} from "../auth/util"
import {jobGetDriverDetails} from "../driver-screen/background-jobs"
import {jobUpdateUserStats} from "../profile/lib"
import {playNotificationSound} from "./sound"
import {TaskDescriptor} from "../common/libs/task-queue/task-descriptor"

import {ActionSetCurrMenuItem} from "../place-management/actions"

import PushNotification, {Importance} from "react-native-push-notification"
import {dbState} from "../common/state"
import {uploadProfile} from "../profile/cloud"

var FirebaseConfig = require("../android/app/google-services")

var title = ""
var message = ""
var notificationImage = StaticImages.getDefaultProfilePhoto()
var jumpToScreen = ""
var jumpToScreenParams = null
var passScreenParamsTo = ""
var orderNotif = false
var hideToast = false
var soundName = ""

function processNotification(
  type: string,
  isSilent: boolean,
  isForeground: boolean,
  isLocal: boolean,
  dispatch: StateChanger,
  notification: any
) {
  let payload: any = null

  if (!isSilent) {
    try {
      if (notification.data && notification.data.payload) {
        payload = JSON.parse(notification.data.payload)
      }
    } catch (e) {
      logger.logE("Failed to parse notification", e)
    }
  }

  if (!payload && notification.title) {
    // no payload, but has title
    title = notification.title
  } else if (payload) {
    title = payload.title
    if (payload.userProfileImageURL) {
      notificationImage = {uri: payload.userProfileImageURL}
    }
  }

  if (!isSilent) {
    AuthTasks.run(() => {
      return jobFetchPushNotifications(dispatch)
    })
  }

  switch (type) {
    // Owner Notifications
    case "ownershipApproved":
      jobMergeCloudList(dispatch, "owned")
      break

    case "ownerTakeOutOrder":
    case "ownerDeliveryOrder":
      if (!isSilent) {
        let currPlace: any = getPlaceFromOrderNotif(payload.placeID, dispatch)
        let switchToScreen = "IncomingOrder"
        if (currPlace) {
          dispatch(new ActionSetCurrPlace(currPlace))
          switchToScreen = "IncomingOrders"
        }

        if (isForeground) {
          if (payload.orderStatus === "created") {
            title = "New order"
            notificationImage = StaticImages.getOwnerNewOrderNotification()
          } else if (payload.orderStatus === "accepted") {
            title = payload.title
            notificationImage = StaticImages.getNewOrderFood()
          } else if (payload.orderStatus === "cancelled") {
            title = "Order cancelled"
            notificationImage = StaticImages.getOrderCancelNotification()
          } else if (payload.orderStatus === "failed") {
            title = "Order Failed"
            notificationImage = StaticImages.getOrderCancelNotification()
          } else if (payload.orderStatus === "rejected") {
            title = "Order Rejected"
            notificationImage = StaticImages.getOrderCancelNotification()
          }
          message = payload.message
          orderNotif = true
          jumpToScreen = "NonModals"
          passScreenParamsTo = switchToScreen
          soundName = c.incomingOrderSound
        } else {
          navigate("NonModals", {screen: switchToScreen})
        }
      } else {
        if (
          notification.data.orderStatus === "accepted" ||
          notification.data.orderStatus === "created"
        ) {
          AuthTasks.run(() => {
            return jobMergeIncomingOrders(dispatch, "new")
          }, new TaskDescriptor("IncomingOrders", "new"))
          if (notification.data.orderStatus === "accepted") {
            jobCancelLocalReminderNotif()
          }
        } else if (
          notification.data.orderStatus === "ready" ||
          notification.data.orderStatus === "rejected" ||
          notification.data.orderStatus === "failed"
        ) {
          AuthTasks.run(() => {
            return jobMergeIncomingOrders(dispatch, "past")
          }, new TaskDescriptor("IncomingOrders", "past"))
          jobCancelLocalReminderNotif()
        }
      }
      break

    case "enableOnlineOrder":
      if (!isSilent) {
        dispatch(new ActionSetListName("Owned"))
        if (isForeground) {
          jumpToScreen = "NonModals"
          passScreenParamsTo = "KartListsScreen"
        } else {
          navigate("NonModals", {screen: "KartListsScreen"})
        }
      }
      break

    // Local Notifications
    case "renderMyOrders":
      if (isLocal) {
        dispatch(new ActionOrdersChanged())
        if (!isForeground) {
          navigate("MyOrdersStack")
        }
      }
      break

    case "driverScheduleReminder":
      if (!isSilent) {
        if (isLocal) {
          if (isForeground) {
            if (notification.data.jumpToScreen === "AutoAcceptRoute") {
              jumpToScreen = "Modals"
              passScreenParamsTo = notification.data.jumpToScreen
              jumpToScreenParams = {params: {fireDate: notification.fireDate}}
            } else {
              jumpToScreen = "NonModals"
              passScreenParamsTo = notification.data.jumpToScreen
            }
          } else {
            if (notification.data.jumpToScreen === "AutoAcceptRoute") {
              navigate("Modals", {
                screen: notification.data.jumpToScreen,
                params: {fireDate: notification.fireDate},
              })
            } else {
              navigate("NonModals", {screen: notification.data.jumpToScreen})
            }
          }
        }
      }
      break

    case "soldOutItemReminder":
      if (isLocal) {
        dispatch(new ActionSetCurrMenuItem(notification.data.menuItemDetails))
        if (isForeground) {
          jumpToScreen = "NonModals"
          passScreenParamsTo = notification.data.passScreenParamsTo
        } else {
          navigate("NonModals", {screen: notification.data.passScreenParamsTo})
        }
      }
      break

    case "orderReminder":
      if (isLocal) {
        let switchScreen = "IncomingOrder"
        if (notification.data.place) {
          let place = JSON.parse(notification.data.place)
          dispatch(new ActionSetCurrPlace(place))
          switchScreen = "IncomingOrders"
        }
        if (isForeground) {
          orderNotif = true
          notificationImage = StaticImages.getOwnerNewOrderNotification()
        } else {
          navigate("NonModals", {screen: switchScreen})
        }
      }
      break

    // Driver Notifications
    case "driverApproved":
      // This is also being called for silent notif
      jobGetDriverDetails(getUserIDInt(), dispatch)
      jobUpdateUserStats(getUserIDInt(), dispatch)

      if (!isSilent) {
        if (isForeground) {
          jumpToScreen = "Profile"
        } else {
          navigate("Profile")
        }
      }
      break

    case "driverAcceptance":
      if (!isSilent) {
        if (isForeground) {
          jobSwitchOrderAcceptanceScreen(dispatch, payload)
          hideToast = true
        } else {
          jobSwitchOrderAcceptanceScreen(dispatch, payload, true)
        }
      }
      break

    case "driverRouteRelease":
    case "driverOrderReady":
      if (!isSilent) {
        if (isForeground) {
          if (type === "driverRouteRelease") {
            message = payload.message
          } else {
            title = "Order ready"
            message = payload.message
            orderNotif = true
            notificationImage = StaticImages.getReadyNotification()
          }
          jumpToScreen = "NonModals"
          passScreenParamsTo = "DriverTrips"
          jumpToScreenParams = {params: {tabToSelect: "Ongoing"}}
          soundName = c.notificationSound
        } else {
          navigate("NonModals", {screen: "DriverTrips", params: {tabToSelect: "Ongoing"}})
        }
      }
      break

    case "driverDeliveryOrder":
    case "driverBatchedOrder":
      if (!isSilent) {
        if (isForeground) {
          jumpToScreen = "NonModals"
          passScreenParamsTo = "DriverTrips"
          jumpToScreenParams = {params: {tabToSelect: "Upcoming"}}
          soundName = c.notificationSound
        } else {
          navigate("NonModals", {screen: "DriverTrips", params: {tabToSelect: "Upcoming"}})
        }
      }
      break

    case "driverFailedOrder":
      if (!isSilent) {
        if (isForeground) {
          jumpToScreen = "NonModals"
          passScreenParamsTo = "DriverTrips"
          jumpToScreenParams = {params: {tabToSelect: "Past"}}
        } else {
          navigate("NonModals", {screen: "DriverTrips", params: {tabToSelect: "Past"}})
        }
      }
      break

    case "driverScheduleRemoval":
      if (!isSilent) {
        jobGetDriverDetails(getUserIDInt(), dispatch)
        if (isForeground) {
          title = payload.title
          message = payload.message
          jumpToScreen = "NonModals"
          passScreenParamsTo = "DriverMenu"
          jumpToScreenParams = {params: {doNotRefresh: true}}
        } else {
          navigate("NonModals", {screen: "DriverMenu", params: {doNotRefresh: true}})
        }
      }
      break

    // Customer Notifications
    case "customerTakeOutOrder":
    case "customerDeliveryOrder":
      if (!isSilent) {
        if (isForeground) {
          if (payload.orderStatus) {
            if (payload.orderStatus === "cancelled") {
              title = "Order cancelled"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getOrderCancelNotification()
            } else if (payload.orderStatus === "rejected") {
              title = "Order rejected"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getOrderCancelNotification()
            } else if (payload.orderStatus === "failed") {
              title = "Order failed"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getOrderCancelNotification()
            } else if (payload.orderStatus === "accepted") {
              title = "Order accepted"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getNewOrderFood()
            } else if (payload.orderStatus === "ready") {
              title = "Order ready"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getReadyNotification()
            } else if (payload.orderStatus === "pickedUp") {
              title = "Order pickedup"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getReadyNotification()
            } else if (payload.orderStatus === "delivered") {
              title = "Order delivered"
              message = payload.title
              orderNotif = true
              notificationImage = StaticImages.getIncompleteDeliveryStep()
            }
          }
          jumpToScreen = "MyOrdersStack"
          soundName = c.notificationSound
        } else {
          navigate("MyOrdersStack")
        }
      } else {
        if (
          (notification.data.orderStatus === "accepted" ||
            notification.data.orderStatus === "rejected" ||
            notification.data.orderStatus === "failed") &&
          notification.data.pushNotificationType === "customerTakeOutOrder"
        )
          jobCancelScheduledOrderWaitNotif(notification.data.orderID)
      }
      break

    case "foodOrderChat":
      if (!isSilent) {
        if (isForeground) {
          title = "New Message"
          message = notification.title
          notificationImage = StaticImages.getChatNotification()
          orderNotif = true
          jumpToScreen = "NonModals"
          passScreenParamsTo = "Chat"
          jumpToScreenParams = {
            params: {
              customerID: payload.customerID,
              placeID: payload.placeID,
              cartAreaID: payload.cartAreaID,
              ownerID: payload.ownerID,
              placeName: payload.placeName,
            },
          }
          soundName = c.orderMessagingSound
          jobStoreNotifChatMessage(dispatch, payload)
        } else {
          navigate("NonModals", {
            screen: "Chat",
            params: {
              customerID: payload.customerID,
              placeID: payload.placeID,
              cartAreaID: payload.cartAreaID,
              ownerID: payload.ownerID,
              placeName: payload.placeName,
            },
          })
        }
      }
      break

    // Common Notifications
    case "Comment":
      if (!isSilent) {
        if (isForeground) {
          title = "New comment"
          message = payload.title
        } else {
          navigate("NonModals", {screen: "PushNotificationScreen"})
        }
      }
      break

    case "Follow":
      if (!isSilent) {
        if (isForeground) {
          title = "New follower"
          message = payload.message
        } else {
          navigate("NonModals", {screen: "PushNotificationScreen"})
        }
      }
      break

    case "ImageLike":
      if (!isSilent) {
        if (isForeground) {
          title = payload.title
          message = payload.message
        } else {
          navigate("NonModals", {screen: "PushNotificationScreen"})
        }
      }
      break

    case "Try":
    case "Been":
      if (!isSilent) {
        if (isForeground) {
          title = payload.message
          message = payload.title
        } else {
          navigate("NonModals", {screen: "PushNotificationScreen"})
        }
      }
      break

    default:
      logger.logI("Cannot identify notification type: ", notification)
      if (!isForeground && !isSilent) {
        navigate("NonModals", {screen: "PushNotificationScreen"})
      }
  }
}

export async function configurePushNotifications(
  dispatch: StateChanger,
  profileState: typeof dbState.profile
) {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (registrationDetails) {
      if (
        registrationDetails &&
        profileState.notificationToken !== registrationDetails.token
      ) {
        dbState.profile.notificationToken = registrationDetails.token
        dbState.profile.platform = registrationDetails.os
        // todo: can this be reliable? Should we have an endpoint just to update token?
        //uploadProfile({avatarUpdated: false, updatedProfile: dbState.profile})
      }
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err)
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      title = "You just got a notification, press here."
      message = ""
      notificationImage = StaticImages.getDefaultProfilePhoto()
      jumpToScreen = "NonModals"
      jumpToScreenParams = null
      passScreenParamsTo = "PushNotificationScreen"
      orderNotif = false
      hideToast = false
      soundName = ""

      if (notification) {
        if (notification.data.isSilentNotification === "true") {
          // silent notification
          if (notification.data.pushNotificationType) {
            processNotification(
              notification.data.pushNotificationType,
              true,
              notification.foreground,
              false,
              dispatch,
              notification
            )
          }
        } else {
          // non silent notification
          let payload: any = {}

          if (!notification.foreground) {
            if (notification.data.islocalNotification) {
              //local notification
              processNotification(
                notification.data.localNotificationType,
                false,
                false,
                true,
                dispatch,
                notification
              )
            } else {
              //remote notification
              try {
                // payload =
                //   Platform.OS === "ios"
                //     ? JSON.parse(notification.data.payload)
                //     : JSON.parse(notification.payload)
                payload = JSON.parse(notification.data.payload)
              } catch (e) {
                logger.logE("Failed to parse notification", e)
              }
              if (payload.pushNotificationType) {
                processNotification(
                  payload.pushNotificationType,
                  false,
                  false,
                  false,
                  dispatch,
                  notification
                )
              }
            }
          } else {
            // app in foreground
            if (notification.data && notification.data.payload) {
              // remote notification
              // has a payload
              try {
                payload = JSON.parse(notification.data.payload)
              } catch (e) {
                logger.logE("Failed to parse notification", e)
              }

              title = payload.title
              if (payload.userProfileImageURL) {
                notificationImage = {uri: payload.userProfileImageURL}
              }

              if (payload.pushNotificationType) {
                processNotification(
                  payload.pushNotificationType,
                  false,
                  true,
                  false,
                  dispatch,
                  notification
                )
              }
            } else if (notification.data && notification.data.islocalNotification) {
              // local notification
              if (notification.title) {
                title = notification.title
                message = notification.message
              } else {
                title = notification.message
              }
              if (notification.data.jumpToScreen) {
                jumpToScreen = notification.data.jumpToScreen
              }
              if (notification.data.passScreenParamsTo) {
                passScreenParamsTo = notification.data.passScreenParamsTo
              }
              if (notification.data.jumpToScreenParams) {
                jumpToScreenParams = notification.data.jumpToScreenParams
              }
              if (notification.data.localNotificationType) {
                processNotification(
                  notification.data.localNotificationType,
                  false,
                  true,
                  true,
                  dispatch,
                  notification
                )
              }
              soundName = notification.soundName
            }
            if (!hideToast) {
              dispatch(
                new ActionShowToastView(
                  (
                    <DefaultToastInnerComponent
                      title={title}
                      orderNotif={orderNotif}
                      notificationImage={notificationImage}
                      message={message}
                      jumpToScreen={jumpToScreen}
                      jumpToScreenParams={jumpToScreenParams}
                      passScreenParamsTo={passScreenParamsTo}
                    />
                  )
                )
              )
              playNotificationSound(soundName ? soundName : c.notificationSound)
            }
          }
        }
      }

      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: FirebaseConfig.project_info.project_number,
  })

  // Create Android custom notification channels
  PushNotification.createChannel({
    channelId: c.notificationChannelID, // (required)
    channelName: "General notifications", // (required)
    channelDescription: "The default Kartbites notification channel", // (optional) default: undefined.
    soundName: c.notificationSound, // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  })

  PushNotification.createChannel({
    channelId: c.incomingOrderNotificationChannel, // (required)
    channelName: "Online order notifications", // (required)
    channelDescription: "Notification channel for online orders", // (optional) default: undefined.
    soundName: c.incomingOrderSound, // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  })

  PushNotification.createChannel({
    channelId: "default-channel-id", // (required)
    channelName: `Default channel`, // (required)
    channelDescription: "A default channel", // (optional) default: undefined.
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  })
}
