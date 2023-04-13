import {Dimensions} from "react-native"

const prod = {
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

  username: "admin123",
  password: "abcd123",
}

let currConfig = prod

if (__DEV__) {
  // Make the test configuration
  const test = {...prod}

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
