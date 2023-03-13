import {DarkTheme, DefaultTheme} from "react-native-paper"

export const lightTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,

    primary: "#ed8eb5", // darker version of our pink
    accent: "#F1D5A4", // our gold
    error: "#82013d", // a more pink version of an error color

    // used by react navigation
    border: "#c7c7cc",
    card: DefaultTheme.colors.surface, // must be same as surface
  },
}

export const darkTheme = {
  ...DarkTheme,
  roundness: 8,
  colors: {
    ...DarkTheme.colors,

    primary: "#ed8eb5",
    accent: "#F1D5A4",
    error: "#82013d",

    // used by react navigation
    border: "#ffffff",
    card: DarkTheme.colors.surface, // must be same as surface
  },
}
