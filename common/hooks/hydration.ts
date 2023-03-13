import {useEffect, useState} from "react"
import {jobHydrateLoginScreenState} from "../../auth/hydrate"
import {reduxStore} from "../libs/init"
import {StateChanger} from "../types"

export function useAppHydrating() {
  const [isAppHydrating, setIsAppHydrating] = useState(true)

  useEffect(() => {
    // quickly restore app state from DB
    hydrateAppStateFromDB(reduxStore.dispatch)
      .then(() => {
        setIsAppHydrating(false)
      })
      .catch(e => {
        throw "App hydration failed " + e.toString()
      })
  }, [])

  return isAppHydrating
}

async function hydrateAppStateFromDB(actionDispatcher: StateChanger) {
  //await jobHydrateGeneralState(actionDispatcher) // MUST be done first
  await jobHydrateLoginScreenState(actionDispatcher)
  //jobHydrateProfileScreenState(actionDispatcher)
  // jobHydrateBlockUsersState(actionDispatcher)
  // jobHydrateSocialScreenState(actionDispatcher)
  // jobHydrateSearchOptionsState(actionDispatcher)
  // jobHydratePushNotificatonScreenState(actionDispatcher)
  // jobHydrateFriendsState(actionDispatcher)
  // hydrateMenuItemsPendingToSync(actionDispatcher)
  // jobHydrateListsState(actionDispatcher)
  // jobHydrateDraftPosts(actionDispatcher)
  // // DO NOT REMOVE. WE NEED TO DIAGNOSE NETWORK FETCH EXCEPTION
  // // OCCURING FOR CART OF THE WEEK
  // // jobHydrateCartOfTheWeekScreenState(actionDispatcher)
  // jobHydrateFoodOrdersScreenState(actionDispatcher)
  // jobHydrateHelpScreenNames(actionDispatcher)
  // jobHydrateDeliveryAddresses(actionDispatcher)
  // jobHydrateDriverProfileScreenState(actionDispatcher)
  // jobHydrateDriverTrips(actionDispatcher)
}
