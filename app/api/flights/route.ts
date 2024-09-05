
import { NextRequest, NextResponse } from 'next/server';
import flights from "@/data/flights.json";

export async function GET() {
    return NextResponse.json(flights);
}
