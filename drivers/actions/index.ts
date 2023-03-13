// actions not categorized in separate files
// can go here.

import {useDeleteDriverMutation} from "../hooks/mutations"
import {ScheduledDriverInterval} from "../types"

// this could have been a one-liner and included
// in the onPress arg in render. Showing here
// just for demo purposes. Notice the typescript
// annotations.
export function removeForToday(
  m: ReturnType<typeof useDeleteDriverMutation>,
  driverIntervals: ScheduledDriverInterval[]
) {
  m.mutate(driverIntervals)
}
