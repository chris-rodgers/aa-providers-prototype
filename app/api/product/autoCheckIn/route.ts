import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { sessionOptions } from "@/lib/session";

import { SessionData } from "@/types/SessionData";
import { AutoCheckIn } from "@/types/AutoCheckIn";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const {
    _cart: { autoCheckIn },
  } = await getIronSession<SessionData>(cookies(), sessionOptions);

  await delay(2000);

  return NextResponse.json(autoCheckIn);
}

export async function PUT(request: Request) {
  const data: AutoCheckIn = await request.json();
  const randomError = Math.random() < 0.5; // 50% chance of throwing a 500 error

  const {
    _cart: { autoCheckIn },
    save,
  } = await getIronSession<SessionData>(cookies(), sessionOptions);

  // Add delay
  await delay(1000);

  // Throw error for testing
  if (randomError) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  // Update isInCart value only
  if (autoCheckIn) {
    autoCheckIn.isInCart = data.isInCart;
  }

  // Save the session
  await save();

  return NextResponse.json(autoCheckIn);
}
