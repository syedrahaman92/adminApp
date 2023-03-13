import {requestRemoveDriver} from "../cloud"
import {useMutation, useQueryClient} from "react-query"
import {ScheduledDriverInterval} from "../types"

export function useDeleteDriverMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    driverIntervals => requestRemoveDriver(driverIntervals[0].driverID, driverIntervals),
    {
      // When mutate is called:
      onMutate: async (info: ScheduledDriverInterval[]) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        // await queryClient.cancelQueries("driverData")
        // Snapshot the previous value
        // const previousData =
        //   queryClient.getQueryData<ScheduledDriverInterval[][]>("driverData")
        // Optimistically update to the new value
        // if (previousData) {
        //   const updatedData = previousData.filter(
        //     eachValue => eachValue[0].driverID !== info[0].driverID
        //   )
        //   queryClient.setQueryData("driverData", updatedData)
        // }
        // return {previousData}
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        // if (context?.previousData) {
        //   queryClient.setQueryData("driverData", context.previousData)
        // }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("driverData")
      },
    }
  )
}
