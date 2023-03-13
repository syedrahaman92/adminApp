import React from "react"
import {AuthNavigator} from ".."
import {useDispatch, useSelector} from "react-redux"
import {useFocusEffect} from "@react-navigation/native"
import {ActionLoginVisible} from "../actions/redux"

type Props = {
  children: React.ReactElement
}

// When the whole screen does not need to be protected, use this.
// Screen will be shown even when user is not logged in.
// When a user performs an action that needs authentication
// (e.g. pressing a button), call ActionLoginVisible()
// to show the login screen.
export function ProtectedInteractions(props: Props) {
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const visible = useSelector(state => state.auth.loginVisible)

  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      // remove login screen when switching away. This
      // ensures the back button on login screen works
      // correctly for screens wrapped in ProtectedScreen.
      // The back button will perform navigation.goBack()
      // when its visibility is false, and ActionLoginVisible(false)
      // when its visibility is true.
      return () => dispatch(new ActionLoginVisible(false))
    }, [dispatch])
  )

  if (loggedIn || !visible) {
    return props.children
  }

  return <AuthNavigator />
}
