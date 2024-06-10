import { useContext } from "react";
import { CartContext, CartContextValues } from "../providers/CartProvider";

export default function useCart() {
    const cartContext: CartContextValues = useContext(CartContext);

    if (cartContext === null) {
        throw new Error ('useCart must be within CartProvider');
    }

    return cartContext;
}