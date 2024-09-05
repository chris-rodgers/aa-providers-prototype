"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { Flight, Flights } from "@/types/Flights";

export default function Home() {
  const { data, isLoading } = useSWR("/api/flights", fetcher);
  const router = useRouter();
  const flights: Flights = data ?? [];

  // Handle flight selection
  async function selectFlight(itinerary: number) {
    const body = JSON.stringify({ itinerary });
    try {
      const response = await fetch("/api/booking", { method: "POST", body });
      if (!response.ok) throw new Error();
      router.push("/checkout");
    } catch (e: unknown) {
      alert("Error creating flight booking");
    }
  }

  const renderFlight = (flight: Flight, i: number) => {
    const onClick = () => selectFlight(i);
    return (
      <Card key={flight.id}>
        <h2 className="text-lg font-bold">{flight.airline}</h2>
        <p>
          <span className="font-semibold">Departure:</span> {flight.departure}
        </p>
        <p>
          <span className="font-semibold">Arrival:</span> {flight.arrival}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {flight.time}
        </p>
        <p>
          <span className="font-semibold">Duration:</span> {flight.duration}
        </p>
        <p className="font-semibold text-green-700">${flight.price}</p>
        <Button className="mt-2" onClick={onClick}>
          Select
        </Button>
      </Card>
    );
  };

  const renderLoadingComponent = () => {
    if (isLoading) {
      return (
        <div className="p-10">
          <img width={50} height={50} src="/images/rabbit.webp" />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <header className="p-2 mb-4 border-b border-gray-600">
        <h1 className="text-xl">Flight Search Results</h1>
      </header>
      {renderLoadingComponent()}
      <div className="space-y-4">{flights.map(renderFlight)}</div>
    </>
  );
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());
