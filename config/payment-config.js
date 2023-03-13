//@flow

import stripe from "tipsi-stripe"
import {config} from "./index"

export function stripeInit() {
  stripe.setOptions(config.stripeOption)
}
