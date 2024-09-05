import Card from "@/components/Card";
import { PriceBreakdownItem } from "@/types/PriceBreakdown";

import { useBookingView } from "./BookingViewProvider";
import classNames from "classnames";

export default function PriceBreakdown() {
  const { data, isLoading } = useBookingView();
  const classList = classNames("h-full", isLoading && "opacity-5");

  if (!data?.priceBreakdown) return null;

  const { priceBreakdown } = data;

  function renderItem(item: PriceBreakdownItem) {
    return (
      <div className="flex justify-between mb-2">
        <span>{item.name}:</span>
        <span>${item.price}</span>
      </div>
    );
  }

  return (
    <Card title="Price Breakdown" className={classList}>
      {priceBreakdown?.items.map(renderItem)}
      <div className="flex justify-between border-t border-black pt-2 font-bold">
        <span>Total:</span>
        <span>${priceBreakdown?.total}</span>
      </div>
    </Card>
  );
}
