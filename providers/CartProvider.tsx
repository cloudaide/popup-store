import { createContext, ReactNode, useState } from "react";
import IProduct from "../types/IProduct";

interface CartContextValues {
  cart: IProduct[] | null | [],
  addToCart?: (product: IProduct, quantity: number) => void;
}
export const CartContext = createContext<CartContextValues>({cart: []});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [currentOrders, setCurrentOrders] = useState([]);

  const addToCart = (product: IProduct, quantity: number) => {
    setCurrentOrders([])
  };
  
  return (
    <CartContext.Provider value={{
      cart: currentOrders,
      addToCart: addToCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
