import useSWR from "swr";
import { createContext, useContext, PropsWithChildren } from "react";
import { Flight } from "@/types/Flights";
import { Booking } from "@/types/Booking";
import { PriceBreakdown } from "@/types/PriceBreakdown";

interface BookingContext {
  data?: { flight: Flight; booking: Booking; priceBreakdown: PriceBreakdown };
  error?: Error;
  isLoading: boolean;
  reload: () => void;
}

const BookingView = createContext<BookingContext>({
  data: undefined,
  error: undefined,
  isLoading: false,
  reload: () => {},
});

async function fetcher(url: string) {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Response not ok");
  return response.json();
}

export default function BookingViewProvider({ children }: PropsWithChildren) {
  // Mutate function will be key here I think - it triggers a reload of the data
  const { data, error, isLoading, mutate } = useSWR("/api/booking", fetcher);

  // Reload booking view
  const reload = () => {
    mutate();
  };

  const value = { data, error, isLoading, reload };

  return <BookingView.Provider value={value}>{children}</BookingView.Provider>;
}

// Helper hook to use booking view context
export function useBookingView() {
  const context = useContext(BookingView);
  if (!context)
    throw new Error("useBookingView must be used within a BookingViewProvider");
  return context;
}
