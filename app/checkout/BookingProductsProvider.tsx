import { PropsWithChildren, createContext, useContext } from "react";
import { useBookingView } from "./BookingViewProvider";
import useProductFactory from "./useProductFactory";

import { Product } from "@/types/Product";
import { CancellationProtection } from "@/types/CancellationProtection";
import { AutoCheckIn } from "@/types/AutoCheckIn";

const Products = createContext<{
  cancellationProtection?: Product<CancellationProtection>;
  autoCheckIn?: Product<CancellationProtection>;
}>({
  cancellationProtection: undefined,
  autoCheckIn: undefined,
});

export default function ProductsProvider({ children }: PropsWithChildren) {
  const { reload } = useBookingView();
  const cancellationProtection = useProductFactory<CancellationProtection>(
    "api/product/cancellationProtection",
    onAdd,
    onError
  );
  const autoCheckIn = useProductFactory<AutoCheckIn>(
    "api/product/autoCheckIn",
    onAdd,
    onError
  );

  // This function is called when an product has successfully been added to the basket.
  function onAdd() {
    // Refreshes the booking view, which contains pricing and basket data
    reload();

    // Additional functionality can be added here
  }

  // This function is called when there was an error adding the product to the basket
  function onError() {
    // Error handling here
    alert("Error adding the product");
  }

  const value = { autoCheckIn, cancellationProtection };

  return <Products.Provider value={value}>{children}</Products.Provider>;
}

// Helper hook to use products context
export function useProducts() {
  const context = useContext(Products);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");
  return context;
}
