import { ReactNode } from "react";
import type { Product } from "@/types/Product";
import Card from "./Card";

interface ProductProps<Data> extends React.BaseHTMLAttributes<HTMLDivElement> {
  title?: string;
  product: Product<Data>;
  renderProduct: (productData: Data) => ReactNode;
}

export default function Product<Data>({
  product,
  renderProduct = () => null,
  ...rest
}: ProductProps<Data>) {
  const renderChildren = () => {
    const { status, data } = product;

    // Ancil loading state
    if (status === "loading") {
      return (
        <div className="flex justify-center">
          <img src="/images/loading.gif" />
        </div>
      );
    }

    // Product error state
    if (status === "error" || !data) {
      return (
        <div className="flex flex-col items-center">
          <img width={50} height={50} src="/images/error.png" />
          <div>Error loading product</div>
        </div>
      );
    }

    return renderProduct(data);
  };

  return <Card {...rest}>{renderChildren()}</Card>;
}
