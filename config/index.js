// @flow
import NativeTachyons, {sizes} from "react-native-style-tachyons"
import {StyleSheet, Dimensions} from "react-native"
import {StaticImages} from "../images/index"

export const appColors = {
  black: "#000000",
  oblack: "hsla(0, 0%, 40%, 1)",
  white: "#FFFFFF",
  borderWhite: "hsla(0, 3%, 92%, 1)",
  dullWhite: "#FDFDFD",
  whitesmoke: "rgba(245, 245, 245, 1)",
  shadeWhitesmoke: "rgba(239, 239, 239, 1)",
  translucentWhite: "hsla(0, 0%, 100%, 0.9)",
  transparent: "hsla(0, 0%, 100%, 0)",
  whiteTransparent: "rgba(255, 255, 255, 0.2)",
  whiteLessTransparent: "rgba(255, 255, 255, 0.52)",
  yellow: "#eee727",
  greyishWhite: "rgba(246, 246, 246, 1)",
  gainsboro: "rgba(216,216,216,1)",
  slightGrey: "rgba(166, 166, 166, 1)",
  grey: "hsla(28, 0%, 90%, 1)",
  suvaGrey: "rgba(136, 136, 136, 1)",
  borderGrey: "rgba(242, 242, 242, 1)",
  lighterGrey: "rgba(185,183,183,1)",
  titleGrey: "rgba(185, 183, 183, 1)",
  cityGrey: "rgba(159, 157, 157, 1)",
  shadyLady: "hsla(0, 0%, 59%, 1)",
  lgrey: "hsla(28, 0%, 95%, 1)",
  lgrey_1: "hsla(0, 0%, 51%, 1)",
  darkGrey: "rgba(166, 166, 166, 1)",
  dgrey: "hsla(28, 0%, 70%, 1)",
  ddgrey: "hsla(28, 0%, 60%, 1)",
  whitesmokeygrey: "hsla(0, 0%, 0%, 0.5)",
  green: "hsla(90, 69%, 72%, 1)",
  dgreen: "#17AA9A",
  red: "hsla(11, 87%, 47%, 1)",
  darkRed: "rgba(208,2,27,1)",
  mortar: "rgba(90,90,90,1)",
  aquagreen: "hsla(176, 100%, 33%, 1)",
  darkAquagreen: "rgba(0,119,112,1)",
  lorange: "rgba(251,176,64,1)",
  main: "hsla(28, 100%, 50%, 1)", // orange,
  orange: "hsla(34, 90%, 61%, 1)",
  blue: "hsla(215, 56%, 45%, 1)",
  dorange: "#EF4136",
  dblue: "#262262",
  odblue: "rgba(38,34,98,0.2)",
  dtitle: "#4a4a4a",
  grblue: "#00A79D",
  dodgerBlue: "rgba(50, 197, 255, 0.4)",
  whblue: "#F0EFF9",
  orangeBrown: "#BD4141",
  orangeRed: "#DA3F3F",
  fbBlue: "#4460A0",
  defaultInsetColor: "hsla(0, 0%, 100%, 1)",
  navBarColor: "hsla(0, 0%, 0%, 1)",
  translucentBlack: "hsla(0, 0%, 0%, 0.6)",
  deepCerise: "rgba(209, 35, 163, 1)",
  filterShadowColor: "rgba(0, 0, 0, 0.2)",
  plum: "#3D455E",
  lightPink: "#F6DCEA",
  faintYellow: "#F0E4CC",
  eastBay: "#494F65",
}

export const standardColors = {
  dark: "#333333",
  dark_7: "rgba(51, 51, 51, 0.7)",
  brandPrimary1: "#262262",
  brandPrimary2: "#4A467C",
  brandPrimary7: "#E3E3EA",
  brandPrimary8: "#ECECF1",
  brandPrimary9: "#F5F5F8",
  brandPrimary9_2: "rgba(245,245,248, 0.2)",
  brandPrimary9_4: "rgba(245, 245, 248, 0.4)",
  brandPrimary9_9: "rgba(245, 245, 248, 0.9)",
  brandSecondary1: "#00A79D",
  brandSecondary2: "#2AB5AD",
  brandSecondary3: "#55C4BD",
  brandSecondary3_2: "rgba(85, 196, 189, 0.2)",
  brandSecondary4: "#7FD3CE",
  brandSecondary5: "#AAE1DE",
  brandSecondary6: "#D4F0EE",
  brandSecondary7: "#008B82",
  brandSecondary8: "#006F68",
  brandSecondary9: "#00534E",
  brandShowcase1: "#D123A3",
  brandRed1: "#EF4136",
  brandRed2: "#F16057",
  brandRed3: "#F48079",
  brandRed4: "#F7A09A",
  brandRed5: "#F9BFBC",
  brandRed6: "#FCDFDD",
  brandOrange1: "#FBB040",
  brandOrange2: "#FBBD5F",
  brandOrange3: "#FCCA7F",
  brandOrange4: "#FDD79F",
  brandOrange5: "#FDE4BF",
  brandOrange6: "#FEF1DF",
  brandOrange6_6: "rgba(254, 241, 223, 0.6)",
  green1: "#4AAF05",
  green2: "#69BC24",
  green3: "#88CA47",
  green4: "#A7D76F",
  green5: "#C6E49A",
  green6: "#E3F2CB",
  green6_7: "rgba(227, 242, 203, 0.7)",
  gray1: "#666666",
  gray2: "#808080",
  gray3: "#999999",
  gray4: "#B3B3B3",
  gray5: "#CCCCCC",
  gray6: "#E6E5E6",
  darkGrey2: "#525252",
  componentsCheckbox: "#666666",
  componentsCaption: "#9C9C9C",
  componentsInputBorder: "#DDDDDD",
  componentsBorder: "#E5E5E5",
  componentsElemHover: "#F5F5F5",
  componentsElemActive: "#D4F0EE",
  transparentGradient: "rgba(255, 255, 255, 0.8)",
  splashYellow: "#F1D5A4",
  componentsBorder_4: "rgba(229, 229, 229, 0.4)",
  eggSour: "rgba(250, 236, 202, 0.37)",
  lightPink2: "#FDE3E2",
}

NativeTachyons.build(
  {
    colors: {
      palette: {...appColors, ...standardColors},
    },
    rem: 16,
    fontRem: 16,
    fonts: {
      fancyRegular: "Montserrat-Regular",
      fancyBold: "Montserrat-Bold",
      fancySemiBold: "Montserrat-SemiBold",
      fancyItalic: "Montserrat-Italic",
      fancyMedium: "Montserrat-Medium",
      titleRegular: "EncodeSans-Regular",
      titleBlack: "EncodeSans-Black",
      titleExtraBold: "EncodeSans-ExtraBold",
      titleBold: "EncodeSans-Bold",
      titleSemiBold: "EncodeSans-SemiBold",
      titleMedium: "EncodeSans-Medium",
      paraRegular: "OpenSans-Regular",
      paraSemiBold: "OpenSans-SemiBold",
      paraItalic: "OpenSans-Italic",
    },
  },
  StyleSheet
)

let prod = {
  server: "app.kartbites.com",
  imageServer: {
    key: "3/MPe63B3uzC00MjJR0N2DqqO2CZKN3uL5BdQqy1W8g",
    keyID: "VRYADCKSD2ZIF5KZEQD4",
    bucket: "kartbites-space",
    folder: "app",
    region: "sgp1",
    url: "sgp1.cdn.digitaloceanspaces.com",
    headers: {
      "Cache-Control": "public,max-age=2592000",
    },
  },
  protocol: "https",
  // msec (10 min). When switching to posts screen, new posts will only be retrieved
  // if its been over 10 min since last refresh. A manuall "pull down" to refresh will
  // still always hit the server.
  postsFetchInterval: 10 * 60 * 1000,
  nearbyRadius: 80000, // approx 50 miles (80 km)
  nearbyCartRadius: 160934, //100 miles in meters
  //804672, //500 miles in meters
  nearbyResults: 16093, //10 miles in meters
  getCartOfTheWeekRadius: 10000,
  getCartOfTheWeekInterval: 8 * 60 * 1000,
  deliveryRadius: 11265, // 7 miles approx
  driverDeliveryLocationRadius: 500, //in meters

  // GPS timeouts
  GPSLocationTimeout: 10000, // msec
  NetLocationTimeout: 5000, // msec

  navIconWidth: 20,
  navBarHeight: 52,
  tabIconWidth: 24,
  tabBarHeight: 52,
  screenWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("window").height,

  // custom styles
  smallFont: {fontSize: sizes.f6 * 0.8},
  smallishFont: {fontSize: sizes.f6 * 0.9},
  f2_5: {fontSize: (sizes.f2 + sizes.f3) / 2},
  f4_5: {fontSize: (sizes.f4 + sizes.f5) / 2},
  f8: {fontSize: 8},
  f10: {fontSize: 10},
  f11: {fontSize: 11},
  f12: {fontSize: 12},
  f13: {fontSize: 13},
  f14: {fontSize: 14},
  f15: {fontSize: 15},
  f16: {fontSize: 16},
  f17: {fontSize: 17},
  f18: {fontSize: 18},
  f19: {fontSize: 19},
  f20: {fontSize: 20},
  f21: {fontSize: 21},
  f22: {fontSize: 22},
  f23: {fontSize: 23},
  f24: {fontSize: 24},
  f28: {fontSize: 28},
  f30: {fontSize: 30},
  f34: {fontSize: 34},
  f48: {fontSize: 48},
  f60: {fontSize: 60},
  f72: {fontSize: 72},

  minTapArea: {padding: 12},
  menuItemHt: 55,
  publishMenuItemHt: 50,
  appID: "1436784682",
  tallButton: {height: 45},
  screenNavButtonsArea: {padding: 15},

  ourCategory: /food|cafe|cofee|tea|restaurant/gi,

  deepLinkPath: "/inapp",

  customDeepLink: "kartbites://screen",

  ipstackAccessKey: "740d9fabef8e92b0565ff527062dc7d2",
  googleMapKey: "AIzaSyDArZm_jCKxasOkZ64S0duxHKlG5s58qxc",
  stripeClientId: "ca_HjUEhM7Z3TTvihUUYWEGOR4Mc2digJH6",
  stripeOption: {
    publishableKey:
      "pk_live_51HA1DJDCz1LMtechxmYlmVGdz6ZERHgTwrAbxTedffC3S5aTryZtRHnHDrslhXLNwzK4lQ3OqTlCwrztkZwadsEY00uFLpqtsR",
    merchantId: "<MERCHANT_ID>",
    androidPayMode: "production",
  },
  iosShadow: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
  },

  openRouteKey: "5b3ce3597851110001cf624833301dd0401d4ef28cc74d110fcf8518",

  waitTime: 600000,
  extraWaitTime: 300000,
  // for testing purpose
  // waitTime: 60000,
  // extraWaitTime: 30000,
  waitTimeMessage:
    "Still waiting for order to be accepted. Would you like to wait a little longer?",
  extraWaitTimeMessage:
    "Regretfully, the order has still not been accepted. Sincere apologies, this is a rare event. Would you like to cancel your order?",

  // how many posts to store in our DB
  // there maybe more while user scrolls
  // but on the next refresh extra posts
  // will be deleted.
  maxPosts: 200,

  // Android notification channel setup
  notificationChannelID: "kartbites-general",
  notificationSound: "zapsplat_wooden_bell.mp3",
  incomingOrderNotificationChannel: "kartbites-orders",
  incomingOrderSound: "zapsplat_bell_service_disk.mp3",
  orderMessagingSound: "zapsplat_chime.mp3",

  driverCommitmentStartLocalNotifID: "-999999 ",
  driverCommitmentEndLocalNotifID: "-888888",
  driverGoOnlineReminderLocalNotifID: "-777777",
  newLocalNotifID: -4444,
  driverDayReminderLocalNotifID: "-666666",
  driverOneHourReminderLocalNotifID: "-555555",
  driverFourHourReminderLocalNotifID: "-444444",

  // optional feature flags
  // won't be visible until enabled
  optionalFeatures: {
    claimOwnership: true,
  },

  freeOrderPerWeek: 1,
  freeOrderPerSixMonths: 6,

  cuisines: [
    {
      icon: StaticImages.getAmericanCuisineIcon(),
      name: "American",
    },
    {
      icon: StaticImages.getAsianCuisineIcon(),
      name: "Asian",
    },
    {
      icon: StaticImages.getBreakfastCuisine(),
      name: "Breakfast",
    },
    {
      icon: StaticImages.getBurgerCuisine(),
      name: "Burgers",
    },
    {
      icon: StaticImages.getEuropianCuisineIcon(),
      name: "European",
    },
    {
      icon: StaticImages.getFriedChickenCuisine(),
      name: "Fried chicken",
    },
    {
      icon: StaticImages.getMacCheeseCuisine(),
      name: "Mac & cheese",
    },
    {
      icon: StaticImages.getTacoCuisine(),
      name: "Mexican",
    },
    {
      icon: StaticImages.getNoodlesCuisine(),
      name: "Noodles",
    },
    {
      icon: StaticImages.getRamenCuisine(),
      name: "Pasta",
    },
    {
      icon: StaticImages.getPizzaCuisineIcon(),
      name: "Pizza",
    },
    {
      icon: StaticImages.getSaladCuisine(),
      name: "Salad",
    },
    {
      icon: StaticImages.getSandwichCuisineIcon(),
      name: "Sandwiches",
    },
    {
      icon: StaticImages.getSeaFoodCuisine(),
      name: "Seafood",
    },
    {
      icon: StaticImages.getSoupCuisine(),
      name: "Soup",
    },
    {
      icon: StaticImages.getSteakCuisine(),
      name: "Steak",
    },
    {
      icon: StaticImages.getVegCuisineIcon(),
      name: "Veg",
    },
  ],

  weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  isoWeekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // This set of week is used in driver scheduling. It starts from Monday.

  foodOrderChatType: "foodOrderChat",
  setupFee: 99, // in dollar
  driverAcceptanceTime: 40, // in second
  minAcceptanceTimeDiff: 2,
  // Default tip percentages and amounts
  tipsPercentages: [{defaultTipPct1: 15}, {defaultTipPct2: 18}, {defaultTipPct3: 20}],
  tipsAmounts: [{defaultTipAmt1: 3}, {defaultTipAmt2: 4}, {defaultTipAmt3: 5}],
  eateryTipsPercents: [{defaultTipPct1: 10}, {defaultTipPct2: 15}, {defaultTipPct3: 18}],
  defaultAvgReadyTime: 15,
  // Driver levels
  driverLevels: [
    {level: 1, title: "beginner", icon: StaticImages.getBeginnerDriverBadge()},
    {level: 2, title: "junior", icon: StaticImages.getJuniorDriverBadge()},
    {level: 3, title: "intermediate", icon: StaticImages.getIntermediateDriverBadge()},
    {level: 4, title: "preferred", icon: StaticImages.getPreferredDriverBadge()},
    {level: 5, title: "best", icon: StaticImages.getBestDriverBadge()},
  ],
}

let currConfig = prod

if (__DEV__) {
  // Make the test configuration
  let test = {...prod}

  // eventually we should change image server
  // configuration too.
  test.server = "test.kartbites.com"
  test.imageServer.folder = "test"

  test.optionalFeatures.claimOwnership = true
  //  test.stripeClientId= "ca_GHlSZxUko4LqSNSRGRRu6JwUIT5LGyLq"
  test.stripeClientId = "ca_HjUEEZiUJIH0mr0lqgmHh8bKFqt0lq9B"
  test.stripeOption = {
    // publishableKey: "pk_test_UbKenh0hQabeo1DpuomDgEjn00TRRNnRkb",
    publishableKey:
      "pk_test_51HA1DJDCz1LMtechUgrGW99fOOX0BFLB3qeaKo7pNlA5N935BBFGt07Q6cOpo1aKQ8xvvXCoy5U3T6DFWvG1UgLZ00in77WoRv",
    merchantId: "<MERCHANT_ID>",
    androidPayMode: "test",
  }

  // In development mode, we should never use the prod
  // configuration.
  currConfig = test
}

export const config = currConfig

// DO NOT REMOVE
// // color themer
// const colorOps = {
//   lightness: 1123,
//   transparency: 1124
// };
//
// function alterColorHsla(color, operation, amount) {
//   let hsla = color.split(/[,()]/);
//
//   let hue, saturation, lightness, alpha = 0;
//
//   try {
//     hue = parseInt(hsla[1]);
//     saturation = parseInt(hsla[2]);
//     lightness = parseInt(hsla[3]);
//     alpha = parseFloat(hsla[4]);
//   } catch (e) {
//     notifier.logE("Error parsing hsla color string (e.g. hsla(0, 0%, 23%, 0.4)). Color unmodified.");
//     return color
//   }
//
//   if (!(hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100
//       && alpha >= 0.0 && alpha <= 1.0)) {
//     notifier.logE("Corrupt hsla color parameter values specified. Color unmodified.");
//     return color
//   }
//
//   switch (operation) {
//     case colorOps.lightness:
//       lightness += Math.round(amount * lightness);
//       break;
//     case colorOps.transparency:
//       alpha += (amount * alpha * -1); // to increase tranparency you must reduce alpha
//       break;
//     default:
//       notifier.logE("Unknown color alter operation. Color unmodified.");
//       return color
//   }
//
//   return ["hsla(" + hue, saturation + "%", lightness + "%", alpha +")"].join(",");
// }
//
// Usage:
// alterColorHsla(mainColor, colorOps.lightness, 0.4) // lighter by 40%
// alterColorHsla(mainColor, colorOps.lightness, -0.3), // darker by 30%
// alterColorHsla(blackColor, colorOps.transparency, 0.3), // 30% more transparent
