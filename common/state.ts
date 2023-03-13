import {authDB, authRedux} from "../auth/state"
// import {profileDB, profileRedux} from "../profile/state"
import {NotificationAction} from "./libs/logger/types"
import {tasksDB} from "./libs/task-queue/state"
import {AppEventStatus} from "./types"

// state stored in DB. Please keep it to a minimum.
// Avoid overlap with values in globalState
export const dbState = {
  meta: {
    version: 1,
  },
  auth: authDB,
  // profile: profileDB,
  tasks: tasksDB,
  general: {
    lat: 0,
    lng: 0,
    draftInfoScreen: true,
    showGalleryFallbackScreen: false,
    showCameraFallbackScreen: false,
    launchedOnce: false,
    deviceID: "",
    permissionDenied: "",
    onlineOrderType: "",
    isSurveyCloseAlertShown: false,
  },
}

// state that's needed inside UI only. This is
// initial redux state that's immutable. It can
// only be changed by redux actions and is accessible
// inside UI components only.
export const defaultReduxState = {
  auth: authRedux,
  // profileScreen: profileRedux,
  app: {
    logs: [""],
    launchUrl: "",
    networkStatus: "pending" as AppEventStatus,
    locationUpdateStatus: "pending" as AppEventStatus,
    locationFetchStatus: {
      fetchingStatus: "none",
      requestedBy: "",
    },
    launchedOnce: false,
    isAppHydrating: true,
    notificationAreaVisible: false,
    currNotificationMsg: "",
    currNotificationAction: undefined as NotificationAction,
    currNotificationLevel: "Error",
  },
}

// state that's needed both inside and outside of UI.
// Things we can't keep just in redux and that's not
// already in db (see dbState)
export const globalState = {}
