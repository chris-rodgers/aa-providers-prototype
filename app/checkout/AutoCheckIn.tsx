import type { CancellationProtection } from "@/types/CancellationProtection";

import Button from "@/components/Button";
import Product from "@/components/Product";
import type { AutoCheckIn } from "@/types/AutoCheckIn";

import { useProducts } from "./BookingProductsProvider";

export default function AutoCheckIn() {
  const { autoCheckIn } = useProducts();

  //Return null if product not available
  if (!autoCheckIn) return null;

  const { trigger, status } = autoCheckIn;

  const renderProduct = (productData: AutoCheckIn) => {
    const { isInCart, price } = productData;
    const buttonText = isInCart ? "Remove from Cart" : "Add to Cart";
    const isLoading = status === "mutating";
    const loadingText = isInCart ? "Removing" : "Adding to cart";

    // Toggle product in cart
    function toggleCartState() {
      trigger({ ...productData, isInCart: !isInCart });
    }

    return (
      <>
        <p className="mb-2">Price: ${price}</p>
        <p className="mb-4 text-sm">
          Take it easy and let us check you in to your flight.
        </p>
        <p className="mb-4 text-sm italic">
          <sup>*</sup>Please note there is a 50% chance this product will error
          when adding or removing.
        </p>
        <Button
          onClick={toggleCartState}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          {buttonText}
        </Button>
      </>
    );
  };

  return (
    <Product
      title="Auto Check-in"
      product={autoCheckIn}
      renderProduct={renderProduct}
    />
  );
}
