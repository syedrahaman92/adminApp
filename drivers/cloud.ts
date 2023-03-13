import {weekNumber, currentDay, queryServer} from "../common/cloud"
import type {ScheduledDriverInterval} from "./types"
import {sleep} from "../common/util"

export async function getScheduledDrivers(): Promise<ScheduledDriverInterval[]> {
  const query =
    `query{
      getScheduledDrivers(userID:"admin123",password:"abcd123", weekNumber: ` +
    weekNumber +
    `,day:"` +
    currentDay +
    `") {
        driverID,
        driverPhone,
        name,
        intervalStart,
        intervalEnd,
        pickupAreaID,
        isInWaitList
      }
    }`

  return (await queryServer(query)).data.getScheduledDrivers as ScheduledDriverInterval[]
}

export async function requestRemoveDriver(
  driverID: number,
  intervals: ScheduledDriverInterval[]
) {
  await sleep(3000)
  throw "big error"

  const graphQLMutation =
    `mutation deleteDriverScheduledIntervals($input:[Interval!]!){
      deleteDriverScheduledIntervals(
        userID:"admin123", 
        password:"abcd123",
        driverID:` +
    driverID +
    `,weekNumber:` +
    weekNumber +
    `,day:"` +
    currentDay +
    `",intervals: $input
      )
    }`
  const variables = {input: intervals}
  return await queryServer(graphQLMutation, variables)
}
