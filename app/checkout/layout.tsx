"use client";
import { PropsWithChildren } from "react";
import BookingViewProvider from "./BookingViewProvider";
import ProductsProvider from "./BookingProductsProvider";

export default function ({ children }: PropsWithChildren) {
  return <Providers>
    {children}
  </Providers>;
}

function Providers({ children }: PropsWithChildren) {
  return (
    <BookingViewProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </BookingViewProvider>
  );
}
