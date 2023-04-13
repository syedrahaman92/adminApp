import moment from "moment"
import {cloudConfig as config} from "../config/cloud"
import {isUserLoggedIn} from "../auth/util"
import {getLoginState} from "../auth/util"
import Base64 from "crypto-js/enc-base64"
import Utf8 from "crypto-js/enc-utf8"
import {logger} from "./libs/logger"
import {GraphQLClient} from "graphql-request"
import {logout} from "../auth/util"
import {RNS3} from "./libs/aws3/RNS3"
import {getRandomInt} from "./util"

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]
export const currentDate = new Date()
export const currentDay = weekDays[moment(currentDate).isoWeekday() - 1]
export const weekNumber = moment(currentDate).isoWeek()

export async function queryServer(graphQLQuery: string, variables?: {[key: string]: unknown}) {
  const url = "https://test.kartbites.com/data"

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({query: graphQLQuery, variables: variables}), // body data type must match "Content-Type" header
  })

  return await response.json() // parses JSON response into native JavaScript objects
}

type RequestParams = {
  method?: string
  body?: any
  headers?: Record<string, string>
  queryparams?: Record<string, string>
  needsAuth?: string // "false", "true", "optional"
}

export async function fireQuery(
  query: string,
  variables?: any,
  needsAuth: "true" | "optional" | "false" = "true",
  host: string = config.server
) {
  let response = null
  let authCredentials = ""
  let headers = {}
  const url = config.protocol + "://" + host + "/data"

  if (needsAuth === "true" || needsAuth === "optional") {
    const currLoginState = getLoginState()

    if (currLoginState.userID && currLoginState.sessionPassword) {
      authCredentials =
        "Basic " +
        Base64.stringify(
          Utf8.parse(currLoginState.userID + ":" + currLoginState.sessionPassword)
        )
    } else if (needsAuth === "true") {
      throw logger.logE("User not logged in")
    }

    headers = {
      authorization: authCredentials,
    }
  }

  const graphQLClient = new GraphQLClient(url, {
    headers: needsAuth ? headers : {},
  })

  try {
    response = await graphQLClient.request(query, variables)
  } catch (error: any) {
    if (!error.response && !error.request) {
      // Handling network fetch exceptions
      logger.logE(
        "Network fetch exception GQL:" +
          JSON.stringify(error) +
          "\n -- url is " +
          url +
          "\n -- request is " +
          JSON.stringify(error.message)
      )
      throw error.message
    } else if (error.response.status >= 400) {
      // Handling HTTP errors
      if (error.response.status === 401) {
        // HTTP status unauthorized
        logout()
      } else {
        // logging all other HTTP errors apart from 401
        logger.logE(
          "Http error at: " +
            JSON.stringify(error) +
            "\n -- url is " +
            url +
            "\n -- request is " +
            JSON.stringify(error.message)
        )
        throw error.message
      }
    } else {
      // Handling GraphQL errors
      logger.logE(JSON.stringify(error) + "  body: " + JSON.stringify(error.response.errors))
      throw error.response.errors
    }
  }

  if (response) {
    return response
  }
}
// resourcePath: when present, begins with a slash, but does not end with a slash
export async function fire(
  method: string,
  resourcePath = "",
  reqParams: RequestParams = {},
  host: string = config.server
) {
  if (!reqParams.body) {
    reqParams.body = ""
  }

  if (!reqParams.headers) {
    reqParams.headers = {}
  }

  if (!("needsAuth" in reqParams)) {
    reqParams.needsAuth = "true"
  }

  const url =
    config.protocol +
    "://" +
    host +
    resourcePath +
    (reqParams.queryparams ? "?" + makeUrlQueryParamString(reqParams.queryparams) : "")

  const req: RequestParams = {}

  let response = null

  try {
    req.method = method

    if (reqParams.headers) {
      req.headers = {...reqParams.headers}
    }

    if (reqParams.body) {
      req.body = reqParams.body
    }

    if (
      (reqParams.needsAuth === "true" || reqParams.needsAuth === "optional") &&
      req.headers &&
      !req.headers.Authorization
    ) {
      // add auth header
      const currLoginState = getLoginState()

      if (currLoginState.userID && currLoginState.sessionPassword) {
        //$FlowFixMe
        req.headers.Authorization =
          "Basic " +
          Base64.stringify(
            Utf8.parse(currLoginState.userID + ":" + currLoginState.sessionPassword)
          )
      } else if (reqParams.needsAuth === "true") {
        // no auth creds present, but request needs auth
        console.log("boom!")
        throw "User not logged in."
      }
    }

    // success or failed HTTP response is returned here
    response = await fetch(url, req)
  } catch (e) {
    throw (
      "Network fetch exception:" +
      JSON.stringify(e) +
      "\n -- url is " +
      url +
      "\n -- request is " +
      JSON.stringify(req)
    )
  }

  if (response.ok) {
    return response
  }

  if (response.status === 401) {
    // http status unauthorized
    logout()
  }

  // treat error response as an exception
  throw JSON.stringify(response) + "  body: " + (await response.text())
}

function makeUrlQueryParamString(params: Record<string, string>) {
  return Object.keys(params).reduce((queryParamString, currParam, i, a) => {
    queryParamString += currParam + "=" + encodeURIComponent(params[currParam])

    if (i + 1 !== a.length) {
      // not last param, so add &
      queryParamString += "&"
    }

    return queryParamString
  }, "")
}

export function addUrlCacheBuster(url: string) {
  return url + "?bustCache=" + getRandomInt()
}

export function getThumbnailName(imageFileName: string) {
  return "thumb-" + imageFileName
}

export function getDownloadImageUrl(
  userId: string,
  fileName: string,
  isThumbnail = false,
  folderPath?: string
): string {
  // if already a well-formed URL, return
  if (fileName.startsWith("http")) {
    return fileName
  }

  if (isThumbnail) {
    fileName = getThumbnailName(fileName)
  }

  let folder = ""
  folder = config.imageServer.folder + "/" + userId + "/"

  if (folderPath) {
    folder = config.imageServer.folder + "/" + userId + "/" + folderPath + "/"
  }

  return (
    "https://" +
    config.imageServer.bucket +
    "." +
    config.imageServer.url +
    "/" +
    folder +
    fileName
  )
}
export function getUploadImageUrl(
  fileName: string,
  isThumbnail?: boolean,
  folderPath?: string
): string {
  if (!isUserLoggedIn()) {
    throw "User not logged in"
  }

  return getDownloadImageUrl(getLoginState().userID, fileName, isThumbnail, folderPath)
}

export async function uploadImage(
  fspath: string,
  uploadFileName: string,
  makePrivate?: boolean,
  folderPath?: string
) {
  if (!isUserLoggedIn()) {
    throw "User not logged in"
  }

  const userID = getLoginState().userID
  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: fspath,
    name: uploadFileName,
    type: "image/jpeg",
  }
  const cloudImageStoreOptions = {
    keyPrefix: config.imageServer.folder + "/" + userID + "/",
    bucket: config.imageServer.bucket,
    region: config.imageServer.region,
    accessKey: config.imageServer.keyID,
    secretKey: config.imageServer.key,
    successActionStatus: 201,
    awsUrl: config.imageServer.url,
    headers: config.imageServer.headers,
    acl: "public-read",
  }

  if (makePrivate) {
    cloudImageStoreOptions.acl = "private"
  }

  if (folderPath) {
    cloudImageStoreOptions.keyPrefix = cloudImageStoreOptions.keyPrefix + folderPath + "/"
  }

  const imageUploadReq = RNS3.put(file, cloudImageStoreOptions)
  await imageUploadReq._promise
  if (imageUploadReq._xhr.status !== 201) {
    const errorMessage =
      "Failed to upload image to cloud image store " +
      imageUploadReq._xhr.status +
      " response " +
      imageUploadReq._xhr.response +
      imageUploadReq._xhr.responseText
    throw errorMessage
  }
}
