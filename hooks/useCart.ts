import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";

export default function useCart() {
    const cartContext = useContext(CartContext);

    if (cartContext === null) {
        throw new Error ('useCart must be within CartProvider');
    }

    return cartContext;
}