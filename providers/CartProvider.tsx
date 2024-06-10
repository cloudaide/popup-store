import { createContext, ReactNode, useEffect, useState } from "react";
import IProduct from "../types/IProduct";

export interface CartContextValues {
  cart: IProduct[] | null | [],
  addToCart: (product: IProduct, quantity: number) => void;
  total: number;
  resetCart: () => void;
}
export const CartContext = createContext<CartContextValues>({
  cart: [],
  total: 0,
  addToCart: (product: IProduct, quantity: number) => {},
  resetCart: () => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [currentOrders, setCurrentOrders] = useState<IProduct[] | []>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addToCart = (product: IProduct, quantity: number) => {
    const newCart: IProduct[] = [
      ...currentOrders,
    ];
    const inCart = newCart?.findIndex((existingProduct: IProduct) => existingProduct?.id === product.id);

    if (inCart >= 0) {
      const currentQty = newCart[inCart]?.quantity || 0;
      newCart[inCart].quantity = currentQty + quantity;
    } else {
      newCart.push({
        ...product,
        quantity,
      });
    }

    const currentCost = product?.price * quantity;

    setTotalAmount(totalAmount + currentCost);
    setCurrentOrders(newCart);
  };

  const resetCart = () => {
    setTotalAmount(0);
    setCurrentOrders([]);
  }
  
  return (
    <CartContext.Provider value={{
      cart: currentOrders,
      addToCart: addToCart,
      total: totalAmount,
      resetCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
