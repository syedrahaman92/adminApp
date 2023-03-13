import {Action} from "./libs/structured-actions"
import {getRandomInt} from "./util"
//import {InitialState as reduxState} from "../app-state-manager/index"
import {defaultReduxState as reduxState} from "./state"

// needed only to switch between old and new app
const defaultReduxState = reduxState

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      card: string
      border: string
    }
  }
}

export type AppState = typeof defaultReduxState

// since the switch to react navigation
// we don't have an easy to access list of all screen
// names. We would have to manually maintain that list
// and so for now, I'm skipping the extra work.
export type ScreenName = string
export function isInvalidPostId(id: number) {
  return id < 0
}

export function getInvalidId() {
  return -1 * getRandomInt()
}

export type FontWeight =
  | "regular"
  | "black"
  | "extrabold"
  | "bold"
  | "semibold"
  | "medium"
  | "italic"
export type FontSpacing = "reg" | "vsml" | "sml" | "med" | "lrg"
export type FontFamily = "title" | "fancy" | "text" | "para"
export type AppEventStatus = "pending" | "success" | "fail"
export type ImageProcessingStatus = "starting" | "processing" | "stopped"
export type PostDelStatus = "none" | "scheduled" | "deleting" | "fail"
export type SyncParams = {
  dbToCloud?: boolean
  screenName?: ScreenName
  yieldToUI?: boolean
}

export type StateChanger = (arg0: Action<any>) => void
export type Dimensions = {
  height: number
  width: number
}

export type ScreenProps<E extends keyof typeof defaultReduxState> =
  (typeof defaultReduxState)[E] & {
    changeState: StateChanger
  } & {
    navigation: any
    dimensions: Dimensions
    route: any
  }
export type ResizedImage = {
  width: number
  height: number
  path: string
}
export type ResizeOptions = {
  noThumbnails: boolean
}
export type ImageSpec = {
  path: string
  lat?: number
  lng?: number
  width: number
  height: number
  dishName?: string
  destinationName?: string
  bombshellcount?: number
  timestamp?: string
  reactionCount?: number
}
export type Position = {
  mocked: false
  timestamp: number
  coords: {
    speed: number
    heading: number
    accuracy: number
    altitude: number
    longitude: number
    latitude: number
  }
}
export type LocationInfo = {
  lat: number
  lng: number
  formattedAddress?: string
  city?: string
  state?: string
  country?: string
}
export type StatsData = "posts" | "followers" | "following" | "found" | "try" | "been"
export type PlaceInfo = {
  name: string
  placeID?: string
  category: string
  locInfo: {
    lat: number
    lng: number
    formattedAddress: string
    city: string
    state: string
    country: string
  }
  type?: string
}
export type ComponentLayout = {
  y: number
  ht: number
  kbdOn: boolean
}
export type LocationFetchStatus = {
  fetchingStatus: "none" | "fetching" | "success" | "failed"
  requestedBy: string
}
