import type { CancellationProtection } from "@/types/CancellationProtection";

import Button from "@/components/Button";
import Product from "@/components/Product";

import { useProducts } from "./BookingProductsProvider";

export default function CancellationProtection() {
  const { cancellationProtection } = useProducts();

  // Return null if product not available
  if (!cancellationProtection) return null;

  const { trigger, status } = cancellationProtection;

  const renderProduct = (productData: CancellationProtection) => {
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
        <p className="mb-4 text-sm italic">
          Flights can be unpredictable, but your refund isn't - cancellation
          protection has your back!
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
      title="Cancellation Protection"
      product={cancellationProtection}
      renderProduct={renderProduct}
    />
  );
}
