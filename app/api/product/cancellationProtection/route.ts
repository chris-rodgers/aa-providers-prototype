import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from 'iron-session';

import { sessionOptions } from '@/lib/session';

import { SessionData } from "@/types/SessionData";
import { CancellationProtection } from "@/types/CancellationProtection";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { _cart: { cancellationProtection } } = await getIronSession<SessionData>(cookies(), sessionOptions);

  await delay(2000);

  return NextResponse.json(cancellationProtection);
}

export async function PUT(request: Request) {
  const data: CancellationProtection = await request.json();
  const { _cart: { cancellationProtection }, save } = await getIronSession<SessionData>(cookies(), sessionOptions);

  // Update isInCart value only
  if (cancellationProtection) {
    cancellationProtection.isInCart = data.isInCart
  }

  // Save the session
  await save();

  await delay(1000);


  return NextResponse.json(cancellationProtection);
}
