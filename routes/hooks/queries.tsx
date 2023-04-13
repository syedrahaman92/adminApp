import {useQuery} from "react-query"
import {getRecentRoutes} from "../cloud"

export const routeQueryKey = {
  latest: "route.latest",
  inactive: "route.inactive",
  future: "route.future",
}

export function useRecentRoutes() {
  const result = useQuery(routeQueryKey.latest, getRecentRoutes, {
    select: data => data.data.getLatestTrips,
  })
  return result
}
