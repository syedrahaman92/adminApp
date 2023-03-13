import React from "react"
import {AuthNavigator} from ".."
import {useSelector} from "react-redux"

type Props = {
  children: React.ReactElement
}

// Any navigators or screens that need to be protected by
// login can use this component as a wrapper. Auth will be
// required automatically before using the respective screen(s)
export function ProtectedScreen(props: Props) {
  const loggedIn = useSelector(state => state.auth.loggedIn)

  if (loggedIn) {
    return props.children
  }

  return <AuthNavigator />
}
