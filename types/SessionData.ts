import { Cart } from "./Cart";
import { Booking } from "./Booking";
import { PriceBreakdown } from "./PriceBreakdown";

export interface SessionData {
    _cart: Cart
    booking: Booking
    priceBreakdown: PriceBreakdown
}

