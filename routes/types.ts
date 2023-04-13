import {ImageSpec, LocationInfo} from "../common/types"

export type Choice = {
  optionTitle: string
  title: string
  description: string
  price: number
  unavailabilityReason: string
  squareChoiceID?: string
  cloverChoiceID?: string
}

export type OrderItem = {
  ID: number
  title: string
  description: string
  price: number
  image: ImageSpec
  avgReadyTime: number
  orderCount: number
  quantity: number
  choices: Choice[]
  specialRequest: string
  isVariation: boolean
  sectionName: string
  squareVariationID?: string
  cloverMenuItemID?: string
  isSpecialRequestDisabled: boolean
}

export type StrIntervalTimestamp = {
  strIntervalStartTimestamp: string
  strIntervalEndTimestamp: string
  strSoonestIntervalStart: string
  strSoonestIntervalEnd: string
  strLongerIntervalStart: string
  strLongerIntervalEnd: string
}

export type FoodOrder = {
  orderID: number
  placeID: number
  cartAreaID: number
  placeName: string
  items: OrderItem[]
  totalPrice: number
  paymentMethodID: string
  phone: string
  estimatedTime: number
  customerID: number
  customerName: string
  status: string
  createdAt: string
  acceptedAt: string
  rejectedAt: string
  readyAt: string
  paymentStatus: string
  refundStatus: string
  paymentIntentID: string
  refundID: string
  email: string
  rejectionReason: string
  restaurantTipAmount: number
  orderType: string
  driverTipsAmount: number
  drivingDistance: number
  driverID: number
  driverAmount: number
  driverPaymentIntentID: string
  driverPaymentStatus: string
  kartbitesFee?: number
  placeImageURL: string
  customerProfileImageURL: string
  placeAddress: string
  currency: string
  ownerID: number
  estimatedTimeDifference: number
  cancelledAt: string
  deliveryAddress: string
  deliveryLocInfo: LocationInfo
  acceptanceRequiredCount: number
  isBatchedOrder: boolean
  routeID: number
  deliveredAt: string
  pickedupAt: string
  pickupAreaID?: number
  schedulingInterval: StrIntervalTimestamp
  customerChargedTotal: number
  kartbitesCutFromDriverPay: number
  subscriptionFeeTaken: number
  logisticsFeeTaken: number
  drivingCost: number
  estimatedPickupTime: string
  driverAcceptedAt: string
  eateryMaxAcceptanceTime: number
  failureReason: string
  idempotenceID: string
  netTotal: number
  taxPercent: number
  driverHandlingFee: number
  eateryHandlingFee: number
  reimbursedAmount: number
  receivedByDevices: string[]
  isSurveyed: boolean
  isPreorder: boolean
  placeType: string
  squareOrderID: string
  totalTipAmount?: number
  tipSpecVersion: number
  isScheduledForFutureInterval: boolean
  frequentOrderReminder: boolean
  cloverOrderID: string
  squareOrderStatus: string
  squareOrderFailureReason: string
  tipAfterReviewAmount: number
}

export type RouteTask = {
  taskID: number
  placeID: number
  placeName: string
  locInfo: LocationInfo
  orderID: number
  routeID: number
  taskType: string
  isCompleted: boolean
  taskCompletedAt: string
  orderReadyTime: number
  taskStatus: string
  deliveryProofImageURL: string
  orderDetails: FoodOrder
  isArrived: boolean
}

export type DeliveryRoute = {
  routeID: number
  driverID: number
  routeStatus: string
  assignedTasksCount: number
  pickupAreaID: number
  routeReleasedAt: string
  routeCompletedAt: string
  schedulingIntervalStart: string
  schedulingIntervalEnd: string
  deliveryLocation: LocationInfo
  cutoffTime: string
  driverTotalEarnings: number
  currency: string
  routeTasks: Array<RouteTask>
  driverName: string
  driverCurrentLocation: LocationInfo
  eligibleDrivers: Array<number>
  deliveryTax: number
  isPool: boolean
}
