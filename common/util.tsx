import {ColorSchemeName, Dimensions, useColorScheme as _useColorScheme} from "react-native"
import {lightTheme, darkTheme} from "../config/Colors"
import {dbState} from "./state"

const screenDims = Dimensions.get("window")
export const minDim =
  screenDims.width < screenDims.height ? screenDims.width : screenDims.height

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>
}

export function useTheme() {
  if (useColorScheme() === "light") {
    return lightTheme
  }
  return darkTheme
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function gen4DigitPin() {
  return Math.floor(1000 + Math.random() * 8999)
}

export function getRandomInt() {
  const maxInvalidId = 10000000 // very large. enough said.

  return Math.floor(Math.random() * maxInvalidId + 1)
}

export function getGeneralState() {
  return dbState.general
}
