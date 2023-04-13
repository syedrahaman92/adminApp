import {MD3DarkTheme, MD3LightTheme} from "react-native-paper"

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,

    primary: "#ed8eb5", // darker version of our pink
    accent: "#F1D5A4", // our gold
    error: "#82013d", // a more pink version of an error color

    // used by react navigation
    border: "#c7c7cc",
    card: MD3LightTheme.colors.surface, // must be same as surface
  },
}

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  colors: {
    ...MD3DarkTheme.colors,

    primary: "#ed8eb5",
    accent: "#F1D5A4",
    error: "#82013d",

    // used by react navigation
    border: "#ffffff",
    card: MD3DarkTheme.colors.surface, // must be same as surface
  },
}
