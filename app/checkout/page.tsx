"use client";

import Journey from "./Journey";
import PriceBreakdown from "./PriceBreakdown";
import CancellationProtection from "./CancellationProtection";
import AutoCheckIn from "./AutoCheckIn";
import { useBookingView } from "./BookingViewProvider";

export default function Checkout() {
  const { data, isLoading, error } = useBookingView();

  if (isLoading || !data) return <img src="/images/loading-2.gif" />;

  if (error)
    return (
      <div className="flex row items-center">
        <img width={50} height={50} src="/images/error.png" />
        <div className="text-xl">404 booking not found</div>
      </div>
    );

  return (
    <div className="flex flex-row space-x-4">
      <div className="w-[500px] space-y-4">
        <Journey title="Flight" flight={data.flight} />
        <CancellationProtection />
        <AutoCheckIn />
      </div>
      <div className="w-[320px]">
        <PriceBreakdown />
      </div>
    </div>
  );
}
