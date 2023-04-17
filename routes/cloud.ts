import {queryServer} from "../common/cloud"
import {dbState} from "../common/state"
import {DeliveryRoute} from "./types"

export async function getRecentRoutes(): Promise<{data: {getLatestTrips: DeliveryRoute[]}}> {
  const graphQLQuery =
    `
    query{
      getLatestTrips(userID:"` +
    dbState.auth.userID +
    `", password:"` +
    dbState.auth.sessionPassword +
    `"){
        routeID,driverID,routeStatus,assignedTasksCount,pickupAreaID,routeReleasedAt,
    routeCompletedAt,driverTotalEarnings,schedulingIntervalStart,
        schedulingIntervalEnd,cutoffTime,deliveryLocation{
          lat,lng,formattedAddress
        },cutoffTime,driverTotalEarnings,routeTasks{taskID,placeID,placeName,locInfo{lat,lng,formattedAddress},orderID,routeID,taskType,isCompleted,taskCompletedAt,orderReadyTime,taskStatus,deliveryProofImageURL,orderDetails{deliveryAddress,failureReason,receivedByDevices,status,isPreorder,
          customerName,rejectionReason,orderID,placeID,cartAreaID,placeName,totalPrice,paymentMethodID,phone,estimatedTime,estimatedPickupTime,pickedupAt,cancelledAt,deliveredAt,estimatedTimeDifference,readyAt,rejectedAt,acceptedAt,createdAt,routeID,driverID,orderType,currency,items{
            image{timestamp,height},title,ID,price,quantity,avgReadyTime,orderCount,
          }
          
        }},
        driverName,driverCurrentLocation{lat,lng}
      }
    }`
  const response = await queryServer(graphQLQuery)
  return response
}
