// production cloud config
const config = {
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
  customDeepLink: "kartbites://screen",
}

// in dev mode set test cloud config
function getCloudConfig() {
  if (__DEV__) {
    config.server = "test.kartbites.com"
    config.imageServer.folder = "test"
  }
  return config
}

export const cloudConfig = getCloudConfig()
