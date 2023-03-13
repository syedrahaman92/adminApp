import {StyleSheet} from "react-native"

const ELEMENT_SPACING = 40

export const ss = StyleSheet.create({
  flx_i: {flex: 1},
  jcc: {justifyContent: "center"},
  jcsb: {justifyContent: "space-between"},
  aic: {alignItems: "center"},
  ba: {borderWidth: 1},
  mh: {marginHorizontal: ELEMENT_SPACING}, // screen border large
  mhxxs: {marginHorizontal: ELEMENT_SPACING / 8},
  mt: {marginTop: ELEMENT_SPACING}, // default distance between elements
  flx_row: {flexDirection: "row"},
  minh: {minHeight: ELEMENT_SPACING},
  mbl: {marginBottom: ELEMENT_SPACING * 2},
  mts: {marginTop: ELEMENT_SPACING / 2},
  mls: {marginLeft: ELEMENT_SPACING / 2},
  mlxxs: {marginLeft: ELEMENT_SPACING / 8},
  phxs: {paddingHorizontal: ELEMENT_SPACING / 4},
  cc: {justifyContent: "center", alignItems: "center"},
  sws: {minWidth: "75%"}, // screen width small
  h: {height: ELEMENT_SPACING},
  hl: {height: ELEMENT_SPACING * 2},
  tac: {textAlign: "center"},
})
