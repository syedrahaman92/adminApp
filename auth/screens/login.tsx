import React, {useState} from "react"
// import {
//   View,
//   Linking,
//   ActivityIndicator,
//   Image,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native"
// import {styles as s} from "react-native-style-tachyons"
// import sa from "../../common/libs/structured-actions"
// import {connect, useSelector} from "react-redux"
// import type {AppState} from "../../app-state-manager"
// import {DeprecatedOurText, OurFancyTitle} from "../../our-components/our-text"
// import {
//   ActionLoginStatus,
//   ActionSetVerificationStatusForSignIn,
//   ActionSetVerificationStatusForSignUp,
//   ActionSetPhoneInputTitle,
//   ActionLoggedIn,
//   ActionLoginVisible,
// } from "../actions/redux"
// import {config as c, appColors, standardColors} from "../../config"
// import type {ScreenProps} from "../../flow-types"
// import urlParse from "url-parse"
// import {StaticImages} from "../../images"
// import {SocialButton} from "../../our-components/social-button"
// import {
//   ActionSetProfileImage,
//   ActionSetUserStateAndCountry,
// } from "../../profile-screen/actions"
// import {authCondition} from "../../background/conditions"
// import {navigate} from "../../nav"
// import {FocusAwareStatusBar} from "../../our-components/focus-aware-status-bar"
// import InAppBrowser from "react-native-inappbrowser-reborn"
// import {logger} from "../../notifications"
// import {OurTitle} from "../../our-components/our-text"
// import {ActionSetTextInputValue} from "../../our-components/actions"
// import OurButton from "../../our-components/our-button"
// import {KeyboardSafeView} from "../../our-components/keyboard-safe-view"
// import {store} from "../../common/db"
// import {dbState} from "../../common/state"
import {ss} from "../../common/styles"
import {Button, Caption} from "react-native-paper"
import {useTheme} from "../../common/util"
import {SocialLoginButtons} from "../components/social-login-buttons"
import {OurAppBarHeader} from "../../common/components/our-app-bar-header"
import {
  loginBackAction,
  LoginStatusT,
  openLoginURL,
  SocialLoginProvider,
} from "../actions/interactions"
import {LoginStatus} from "../components/login-status"
import {useSelector} from "react-redux"
import {View} from "react-native"

// type Props = ScreenProps<"loginScreen"> & {
//   textInputs: Record<string, string>
//   launchUrl: string
//   navigation: any
//   selectedCountry: string
//   phoneInputTitle: string
//   loginVisible: boolean
// }

// class LoginScreenPresentation extends React.Component<Props> {
//   closeMe = () => {
//     this.props.changeState(
//       new ActionLoginStatus({
//         msg: " ",
//       })
//     )
//     if (this.props.loginVisible) {
//       this.props.changeState(new ActionLoginVisible(false))
//     } else {
//       this.props.navigation.goBack()
//     }
//   }

//   _handleLoginSuccess = (parsedUrl: any) => {
//     // let apps know user has signed in successfully
//     dbState.auth.userID = parsedUrl.query.userID
//     dbState.auth.sessionPassword = parsedUrl.query.sessionPassword

//     // update profile info
//     dbState.profile.loginEmail = parsedUrl.query.authid
//     //this.props.changeState(new ActionSetLoginEmail(parsedUrl.query.authid))

//     // if server has data set it in the profile
//     if (parsedUrl.query.alternateEmail) {
//       dbState.profile.alternateEmail = parsedUrl.query.alternateEmail
//       //this.props.changeState(new ActionSetAlternateEmail(parsedUrl.query.alternateEmail))
//     }

//     if (parsedUrl.query.alternatePhone) {
//       dbState.profile.alternatePhone = parsedUrl.query.alternatePhone
//       //this.props.changeState(new ActionSetAlternatePhone(parsedUrl.query.alternatePhone))
//     }

//     if (parsedUrl.query.picture) {
//       dbState.profile.profileImageUri = parsedUrl.query.picture
//       this.props.changeState(new ActionSetProfileImage(parsedUrl.query.picture))
//     }

//     if (parsedUrl.query.name) {
//       dbState.profile.name = parsedUrl.query.name
//       //this.props.changeState(new ActionSetProfileName(parsedUrl.query.name))
//     }

//     if (parsedUrl.query.username) {
//       dbState.profile.username = parsedUrl.query.username
//       //this.props.changeState(new ActionSetUsername(parsedUrl.query.username))
//     }

//     if (parsedUrl.query.city && parsedUrl.query.state && parsedUrl.query.country) {
//       dbState.profile.city = parsedUrl.query.city
//       dbState.profile.state = parsedUrl.query.state
//       dbState.profile.country = parsedUrl.query.country
//       this.props.changeState(
//         new ActionSetUserStateAndCountry({
//           city: parsedUrl.query.city,
//           state: parsedUrl.query.state,
//           country: parsedUrl.query.country,
//         })
//       )
//     }

//     // store updated profile details to DB
//     store("profile", dbState.profile)

//     // save updated user credentials in DB
//     store("auth", dbState.auth)

//     this.props.changeState(new ActionLoggedIn())
//     authCondition.satisfied(true)

//     // navigate to profile edit screen only if server
//     // has no data for user. That time user has to create
//     // their basic profile.
//     if (!dbState.profile.username) {
//       // new user
//       this.props.navigation.navigate("NonModals", {
//         screen: "ProfileEditMain",
//         params: {
//           creating: true,
//         },
//       })
//     }
//   }

//   _appLaunchedByLoginUrl = url => {
//     if (!url) {
//       return
//     }

//     // Do Whatever you need to do within your app to redirect users to the proper route
//     const parsedUrl = urlParse(url, true)

//     if (parsedUrl.query.login === "true") {
//       this.props.changeState(
//         new ActionLoginStatus({
//           msg: "Login successful!",
//           buttonDisabled: true,
//         })
//       )

//       // add artificial delay to reduce flicker.
//       this._handleLoginSuccess(parsedUrl)
//     } else {
//       this.props.changeState(
//         new ActionLoginStatus({
//           msg: "Login failed. Please try again.",
//         })
//       )
//     }
//   }
//   _openLoginURL = async providerName => {
//     // User already logged in before during this app session
//     // no need to go to Google again.
//     this.props.changeState(
//       new ActionLoginStatus({
//         msg: "Waiting for " + providerName + "...",
//         buttonDisabled: true,
//         waitingForBrowser: true,
//       })
//     )
//     const loginServer =
//       c.protocol + "://" + c.server + "/login/social/userinfo?provider=" + providerName

//     try {
//       if (await InAppBrowser.isAvailable()) {
//         InAppBrowser.openAuth(loginServer, c.customDeepLink, {
//           // iOS Properties
//           ephemeralWebSession: false,
//           // Android Properties
//           showTitle: false,
//           enableUrlBarHiding: true,
//           enableDefaultShare: false,
//         }).then(response => {
//           if (response.type === "success" && response.url) {
//             this.props.changeState(
//               new ActionLoginStatus({
//                 msg: "Logging in...",
//                 buttonDisabled: true,
//               })
//             )

//             this._appLaunchedByLoginUrl(response.url)
//           } else {
//             this.props.changeState(
//               new ActionLoginStatus({
//                 msg: "Login failed. Please try again.",
//               })
//             )
//           }
//         })
//       } else {
//         // add artificial delays to reduce flicker.
//         Linking.canOpenURL(loginServer).then(supported => {
//           if (supported) {
//             Linking.openURL(loginServer)
//           } else {
//             this.props.changeState(
//               new ActionLoginStatus({
//                 msg: "Social login unavialable. Cannot launch browser.",
//                 buttonDisabled: true,
//               })
//             )
//           }
//         })
//       }
//     } catch (error) {
//       this.props.changeState(
//         new ActionLoginStatus({
//           msg: "Login failed. Please try again.",
//         })
//       )
//       logger.logE("Failed to login", error)
//     }
//   }
//   switchToPhoneAuth = () => {
//     this.props.changeState(new ActionSetPhoneInputTitle(""))

//     navigate("PhoneAuth")
//   }

//   switchToUsernameAuth = () => {
//     this.props.changeState(new ActionSetTextInputValue({textInputId: "signInEmail", val: ""}))
//     this.props.changeState(
//       new ActionSetTextInputValue({textInputId: "signInPassword", val: ""})
//     )
//     this.props.changeState(new ActionSetVerificationStatusForSignIn("pending"))
//     this.props.changeState(
//       new ActionSetVerificationStatusForSignUp({status: "pending", reason: ""})
//     )

//     navigate("UsernameAuth")
//   }

//   //fixme: blowing DB after each login is required so that the login flow shows profilecreate screen, once logged in
//   componentDidUpdate(prevProps: Props) {
//     if (this.props.waitingForBrowser && this.props.launchUrl !== prevProps.launchUrl) {
//       this.props.changeState(
//         new ActionLoginStatus({
//           msg: "Logging in...",
//           buttonDisabled: true,
//         })
//       )

//       this._appLaunchedByLoginUrl(this.props.launchUrl)
//     }
//   }

//   render() {
//     return (
//       <KeyboardSafeView style={[s.flx_i, s.bg_white]}>
//         <FocusAwareStatusBar
//           barStyle={"dark-content"}
//           translucent={false}
//           backgroundColor={appColors.white}
//         />
//         <SafeAreaView style={{flex: 0, backgroundColor: appColors.white}} />
//         <View style={[s.flx_i]}>
//           <View style={[s.flx_i, {paddingHorizontal: 20, paddingVertical: 20}]}>
//             <View style={[s.flx_row, s.aic]}>
//               <TouchableOpacity
//                 style={[s.aic, s.jcc, {height: 40, width: 40}]}
//                 onPress={this.closeMe}>
//                 <Image source={StaticImages.getArrowLeft()} />
//               </TouchableOpacity>
//               <OurTitle fontSize={24} weight={"bold"} style={[s.aic, s.dark, {marginLeft: 4}]}>
//                 {"Log in"}
//               </OurTitle>
//             </View>
//             <OurFancyTitle
//               style={[s.gray1, {marginLeft: 44, marginTop: 10}]}
//               fontSize={16}
//               weight={"medium"}>
//               {"Choose a login method "}
//             </OurFancyTitle>
//             <View style={[s.flx_i, {paddingHorizontal: 20}]}>
//               <View style={[s.flx_i, s.jcc]}>
//                 <View style={[s.flx_row, s.jcsb]}>
//                   <OurButton
//                     icon={StaticImages.getGoogleIcon()}
//                     onPress={() => {
//                       this._openLoginURL("Google")
//                     }}
//                     iconStyle={[s.jcc, s.aic, {marginRight: -2}]}
//                     disabled={this.props.buttonDisabled}
//                     style={[
//                       s.bg_white,
//                       s.jcc,
//                       s.aic,
//                       s.ba,
//                       {
//                         borderRadius: 10,
//                         height: 48,
//                         width: "30%",
//                         borderColor: standardColors.componentsInputBorder,
//                       },
//                     ]}
//                   />
//                   <OurButton
//                     icon={StaticImages.getFacebookIcon()}
//                     onPress={() => {
//                       this._openLoginURL("Facebook")
//                     }}
//                     iconStyle={[s.jcc, s.aic, {marginRight: -2}]}
//                     disabled={this.props.buttonDisabled}
//                     style={[
//                       s.bg_white,
//                       s.jcc,
//                       s.aic,
//                       s.ba,
//                       {
//                         borderRadius: 10,
//                         height: 48,
//                         width: "30%",
//                         borderColor: standardColors.componentsInputBorder,
//                       },
//                     ]}
//                   />
//                   <OurButton
//                     icon={StaticImages.getAppleIcon()}
//                     onPress={() => {
//                       this._openLoginURL("Apple")
//                     }}
//                     iconStyle={[s.jcc, s.aic, {marginRight: -2}]}
//                     disabled={this.props.buttonDisabled}
//                     style={[
//                       s.bg_white,
//                       s.jcc,
//                       s.aic,
//                       s.ba,
//                       {
//                         borderRadius: 10,
//                         height: 48,
//                         width: "30%",
//                         borderColor: standardColors.componentsInputBorder,
//                       },
//                     ]}
//                   />
//                 </View>
//                 <SocialButton
//                   label="Login with phone number"
//                   labelBg={appColors.white}
//                   icon={StaticImages.getSmartPhone()}
//                   onPress={this.switchToPhoneAuth}
//                   disabled={this.props.buttonDisabled}
//                   style={[
//                     s.ba,
//                     {marginTop: 15, borderColor: standardColors.componentsInputBorder},
//                   ]}
//                 />

//                 <SocialButton
//                   label="Username/Password"
//                   labelBg={appColors.white}
//                   icon={StaticImages.getLockIcon()}
//                   onPress={this.switchToUsernameAuth}
//                   disabled={this.props.buttonDisabled}
//                   style={[
//                     s.ba,
//                     {marginTop: 15, borderColor: standardColors.componentsInputBorder},
//                   ]}
//                 />
//                 <View style={[s.aic, {marginTop: 50}]}>
//                   {this.props.loginScreenText.length > 0 &&
//                   this.props.loginScreenText !== " " ? (
//                     <ActivityIndicator size="large" color={appColors.plum} />
//                   ) : null}
//                   <DeprecatedOurText style={[s.ma2, s.f6, s.dark]}>
//                     {this.props.loginScreenText}
//                   </DeprecatedOurText>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </KeyboardSafeView>
//     )
//   }
// }

// const mapStateToProps = (state: AppState) => ({
//   loginScreenText: state.auth.loginScreenText,
//   buttonDisabled: state.auth.buttonDisabled,
//   textInputs: state.allTextInputs,
//   waitingForBrowser: state.auth.waitingForBrowser,
//   launchUrl: state.app.launchUrl,
//   selectedCountry: state.app.selectedCountry,
//   phoneInputTitle: state.phoneInputTitle,
//   loginVisible: state.auth.loginVisible,
// })

// const mapDispatchToProps = dispatch => ({
//   changeState: sa.getDispatchHandler(dispatch),
// })

// export const LoginScreen1 = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginScreenPresentation)

export function LoginScreen({navigation}) {
  const currTheme = useTheme()
  const loginVisible = useSelector(state => state.auth.loginVisible)

  const [loginStatus, setLoginStatus] = useState<LoginStatusT>({
    msg: " ",
    buttonDisabled: false,
    waitingForBrowser: false,
  })

  return (
    <>
      <OurAppBarHeader
        title="Sign in"
        subtitle="Choose a sign in method"
        hasBackAction={true}
        customBackAction={() => {
          setLoginStatus({msg: " "})
          loginBackAction(loginVisible, navigation)
        }}
      />
      <View style={[ss.flx_i, ss.cc]}>
        <View style={[ss.sws]}>
          <Caption style={[ss.tac]}>Sign in with</Caption>
          <SocialLoginButtons
            beginOAuth={(providerName: SocialLoginProvider) =>
              openLoginURL(providerName, setLoginStatus, navigation)
            }
          />
          <Button
            icon="cellphone-text"
            style={[ss.mhxxs, ss.mts]}
            mode="outlined"
            color={currTheme.colors.text}>
            phone number
          </Button>
          <Button
            icon="lock"
            style={[ss.mhxxs, ss.mts]}
            mode="outlined"
            color={currTheme.colors.text}>
            {"username & password"}
          </Button>
        </View>
        <LoginStatus {...loginStatus} />
      </View>
    </>
  )
}
