// import {cloudConfig as c} from "../../config/cloud"
// import urlParse from "url-parse"
import {ActionLoggedIn, ActionLoginVisible} from "./redux"
// import {dbState} from "../../common/state"
// import {ActionSetProfileImage, ActionSetUserStateAndCountry} from "../../profile/actions/redux"
// import {authCondition} from "../../common/libs/task-queue/conditions"
// import {store} from "../../common/db"
// import {openWebAuthSession} from "../../common/util"
import {reduxStore} from "../../common/libs/init"

// export type LoginStatusT = {
//   msg: string
//   buttonDisabled?: boolean
//   waitingForBrowser?: boolean
// }

export type SocialLoginProvider = "Apple" | "Facebook" | "Google"

// export async function openLoginURL(
//   providerName: SocialLoginProvider,
//   setLoginStatus: (s: LoginStatusT) => void,
//   navigation
// ) {
//   // User already logged in before during this app session
//   // no need to go to Google again.
//   setLoginStatus({
//     msg: "Waiting for " + providerName + "...",
//     buttonDisabled: true,
//     waitingForBrowser: true,
//   })

//   // const loginServer =
//   //   c.protocol +
//   //   "://" +
//   //   c.server +
//   //   "/login/social/userinfo?provider=" +
//   //   providerName +
//   //   "&appLaunchURL=" +
//   //   Linking.createURL("/")

//   // console.log(" login server", loginServer)

//   // openWebAuthSession(loginServer, "", {
//   //   showTitle: false,
//   //   enableDefaultShareMenuItem: false,
//   // })
//   //   .then(response => {
//   //     if (response.type === "success" && response.url) {
//   //       setLoginStatus({
//   //         msg: "Logging in...",
//   //         buttonDisabled: true,
//   //       })

//   //       appLaunchedByLoginUrl(response.url, setLoginStatus, navigation)
//   //     } else {
//   //       setLoginStatus({
//   //         msg: "Login failed. Please try again.",
//   //       })
//   //     }
//   //   })
//   //   .catch(e => {
//   //     setLoginStatus({
//   //       msg: "Login failed. Error: " + e.toString(),
//   //     })
//   //   })
// }

export function appLaunchedByLoginUrl(
  url: string,
  setLoginStatus: (s: LoginStatusT) => void,
  navigation
) {
  if (!url) {
    return
  }

  // const parsedUrl = urlParse(url, true)

  // if (parsedUrl.query.login === "true") {
  //   setLoginStatus({
  //     msg: "Login successful!",
  //     buttonDisabled: true,
  //   })

  //   handleLoginSuccess(parsedUrl, navigation)
  // } else {
  //   setLoginStatus({
  //     msg: "Login failed. Please try again.",
  //   })
  // }
}

// export function handleLoginSuccess(parsedUrl: any, navigation) {
//   // let apps know user has signed in successfully
//   dbState.auth.userID = parsedUrl.query.userID
//   dbState.auth.sessionPassword = parsedUrl.query.sessionPassword

//   // update profile info
//   dbState.profile.loginEmail = parsedUrl.query.authid
//   //this.props.changeState(new ActionSetLoginEmail(parsedUrl.query.authid))

//   // if server has data set it in the profile
//   if (parsedUrl.query.alternateEmail) {
//     dbState.profile.alternateEmail = parsedUrl.query.alternateEmail
//     //this.props.changeState(new ActionSetAlternateEmail(parsedUrl.query.alternateEmail))
//   }

//   if (parsedUrl.query.alternatePhone) {
//     dbState.profile.alternatePhone = parsedUrl.query.alternatePhone
//     //this.props.changeState(new ActionSetAlternatePhone(parsedUrl.query.alternatePhone))
//   }

//   if (parsedUrl.query.picture) {
//     dbState.profile.profileImageUri = parsedUrl.query.picture
//     reduxStore.dispatch(new ActionSetProfileImage(parsedUrl.query.picture))
//   }

//   if (parsedUrl.query.name) {
//     dbState.profile.name = parsedUrl.query.name
//     //this.props.changeState(new ActionSetProfileName(parsedUrl.query.name))
//   }

//   if (parsedUrl.query.username) {
//     dbState.profile.username = parsedUrl.query.username
//     //this.props.changeState(new ActionSetUsername(parsedUrl.query.username))
//   }

//   if (parsedUrl.query.city && parsedUrl.query.state && parsedUrl.query.country) {
//     dbState.profile.city = parsedUrl.query.city
//     dbState.profile.state = parsedUrl.query.state
//     dbState.profile.country = parsedUrl.query.country
//     reduxStore.dispatch(
//       new ActionSetUserStateAndCountry({
//         city: parsedUrl.query.city,
//         state: parsedUrl.query.state,
//         country: parsedUrl.query.country,
//       })
//     )
//   }

//   // store updated profile details to DB
//   store("profile", dbState.profile)

//   // save updated user credentials in DB
//   store("auth", dbState.auth)

//   reduxStore.dispatch(new ActionLoggedIn())
//   authCondition.satisfied(true)

//   // navigate to profile edit screen only if server
//   // has no data for user. That time user has to create
//   // their basic profile.
//   if (!dbState.profile.username) {
//     // new user
//     navigation.navigate("NonModals", {
//       screen: "ProfileEditMain",
//       params: {
//         creating: true,
//       },
//     })
//   }
// }

export function loginBackAction(loginVisible: boolean, navigation) {
  if (loginVisible) {
    reduxStore.dispatch(new ActionLoginVisible(false))
  } else {
    navigation.goBack()
  }
}
