import {Choice, OrderItem} from "./types"

export const getSeparateItems = (foodOrderItems: Array<OrderItem>) => {
  const lineItems: OrderItem[] = []
  foodOrderItems.map(item => {
    for (let i = 0; i < item.quantity; i++) {
      lineItems.push({...item, quantity: 1})
    }
  })

  return lineItems
}

export function roundOffPrice(price: number) {
  return Math.round(parseFloat((price * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
}

export function getItemTotalPrice(itemPrice: number, quantity: number) {
  return roundOffPrice(itemPrice * quantity)
}

function groupBy(objectArray: Array<Choice>, property: string) {
  return objectArray.reduce(function (acc, obj) {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

export function getItemOptions(choices: Array<Choice>) {
  const optionArray: Array<any> = []

  const groupedChoices = groupBy(choices, "optionTitle")

  Object.keys(groupedChoices).forEach(function (key) {
    let options = ""
    for (let i = 0; i < groupedChoices[key].length; i++) {
      options = options + (options !== "" ? ", " : "") + groupedChoices[key][i].title
    }
    const object = {
      optionTitle: key,
      choices: options,
    }
    if (object.optionTitle === "Variations") {
      optionArray.unshift(object)
    } else {
      optionArray.push(object)
    }
  })
  return optionArray
}
