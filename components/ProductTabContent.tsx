import { View } from "react-native";
import ProductCard from "./ProductCard";
import ICategory from "../types/ICategory";
import IProduct from "../types/IProduct";

interface ProductTabContentProps {
  category: ICategory | undefined;
}

export default function ProductTabContent({ category }: ProductTabContentProps) {
  return (
    <>
      {category?.products.map((product: IProduct) => (
        <ProductCard key={`product-${product.id}`} price={product?.price} imagePath="" name={product?.product_name} description={product?.description} />
      ))}
    </>
  );
}