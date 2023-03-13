import {useQuery} from "react-query"
import {getScheduledDrivers} from "../cloud"
import {ScheduledDriverInterval} from "../types"

function convertDriverIntervalsToMap(driverIntervals: ScheduledDriverInterval[]) {
  // a driver can have multiple intervals in this list
  // however, for UI we need to convert to list of intervals
  // per driver
  const diDisplay: {[driverID: string]: ScheduledDriverInterval[]} = {}
  driverIntervals.map((di: ScheduledDriverInterval) => {
    if (!diDisplay[di.driverID]) {
      diDisplay[di.driverID] = []
    }
    diDisplay[di.driverID].push(di)
  })

  // sort the intervals
  for (const id in diDisplay) {
    diDisplay[id].sort((a, b) => {
      const ahour = parseInt(a.intervalStart.split(":")[0], 10)
      const bhour = parseInt(b.intervalStart.split(":")[0], 10)
      return ahour - bhour
    })
  }

  return diDisplay
}

// returns driver intervals as a map
// indexed by driver id
export function useDriverIntervalsAsMap() {
  return useQuery<
    ScheduledDriverInterval[],
    Error,
    {[driverID: string]: ScheduledDriverInterval[]}
  >("driverData", getScheduledDrivers, {
    select: convertDriverIntervalsToMap,
  })
}

// returns driver intervals as an array
// of arrays. Each top-level array element
// is an array of intervals for the same driver
// this is useful for rendering in a flatlist
export function useDriverIntervals() {
  return useQuery<ScheduledDriverInterval[], Error, ScheduledDriverInterval[][]>(
    "driverData",
    getScheduledDrivers,
    {
      // must convert and return values from cloud. Conversion should
      // not happen in render functions. Conversions should be avoided
      // in other places.
      select: driverIntervals => Object.values(convertDriverIntervalsToMap(driverIntervals)),
    }
  )
}
