import { createContext, ReactNode, useEffect, useState } from "react";
import IProduct from "../types/IProduct";

export interface CartContextValues {
  cart: IProduct[] | null | [],
  addToCart: (product: IProduct, quantity: number) => void;
  total: number;
  resetCart: () => void;
  removeFromCart: (productId: number) => void;
}
export const CartContext = createContext<CartContextValues>({
  cart: [],
  total: 0,
  addToCart: () => {},
  resetCart: () => {},
  removeFromCart: (productId: number) => {}
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

  const removeFromCart = (productId: number) => {
    const inCart = currentOrders?.findIndex((product: IProduct) => product?.id === productId);
    const newCart = [
      ...currentOrders,
    ];

    if (inCart >= 0) {
      const currentQty = newCart[inCart]?.quantity || 0;
      const currentCost = newCart[inCart]?.price * currentQty;

      newCart.splice(inCart, 1);
      setTotalAmount(totalAmount - currentCost);
      setCurrentOrders(newCart);
    }
  }
  
  return (
    <CartContext.Provider value={{
      cart: currentOrders,
      addToCart: addToCart,
      total: totalAmount,
      resetCart,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}
