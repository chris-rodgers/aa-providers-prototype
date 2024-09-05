// app/api/create-booking/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";

import { Booking } from "@/types/Booking";
import { Flight } from "@/types/Flights";
import { CancellationProtection } from "@/types/CancellationProtection";
import { SessionData } from "@/types/SessionData";

import { sessionOptions } from "@/lib/session";
import flights from "@/data/flights.json";
import { Cart } from "@/types/Cart";
import { PriceBreakdown } from "@/types/PriceBreakdown";

// /booking/create
export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const data = await req.json();
  const { itinerary } = data;
  const flight = flights[itinerary];

  session._cart = {};

  // Cancelation protection cart object
  session._cart.cancellationProtection = {
    price: Math.round(flight.price / 10),
    isInCart: true,
  };

  // Cancelation protection cart object
  session._cart.autoCheckIn = {
    price: 5,
    isInCart: false,
  };

  // Init new booking
  session.booking = {
    itinerary,
  };

  session.priceBreakdown = getPriceBreakdown(flight, session._cart);

  await session.save();

  return NextResponse.json({});
}

// /booking/view
export async function GET(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.booking) {
    const { booking } = session;
    const flight = flights[booking.itinerary as keyof typeof flights] as Flight;
    const priceBreakdown = getPriceBreakdown(flight, session._cart);

    return NextResponse.json({ flight, booking, priceBreakdown });
  } else {
    return NextResponse.json(
      { message: "No booking found in the session" },
      { status: 404 }
    );
  }
}

// Helper function to generate the price breakdown
function getPriceBreakdown(flight: Flight, cart: Cart): PriceBreakdown {
  const result: PriceBreakdown = {
    items: [],
    total: 0,
  };

  // Cancellation protection
  if (cart.cancellationProtection?.isInCart) {
    result.items.push({
      name: "Cancellation protection",
      price: cart.cancellationProtection.price,
    });
  }

  // Auto check-in
  if (cart.autoCheckIn?.isInCart) {
    result.items.push({
      name: "Auto check-in",
      price: cart.autoCheckIn.price,
    });
  }

  // Flights
  result.items.push({
    name: "Flight",
    price: flight.price,
  });

  // Calculate total
  result.total = result.items.reduce((prev, curr) => prev + curr.price, 0);

  return result;
}

export const config = {
  api: {
    externalResolver: true,
  },
};
