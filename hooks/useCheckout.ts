import useCart from "./useCart";
import { useSQLiteContext } from "expo-sqlite";

export default function useCheckout() {
  const db = useSQLiteContext();
  const { resetCart } = useCart();
  const saveTransaction = async (cart: any, total: any) => {
    const saveTransactionQuery = await db.prepareAsync(
      'INSERT INTO transactions (total) VALUES ($total);'
    );
    const saveTransactionDetailsQuery = await db.prepareAsync(
      'INSERT INTO transaction_details (transaction_id, product_id, unit_price, total_price, quantity) VALUES ($transactionId, $productId, $price, $totalPrice, $quantity)'
    );

    try {
      const newTransaction = await saveTransactionQuery.executeAsync({
        $total: total,
      });
      const transactionId = newTransaction.lastInsertRowId;

      for (let product of cart) {
        await saveTransactionDetailsQuery.executeAsync({
          $transactionId: transactionId,
          $productId: product.id,
          $price: product.price,
          $totalPrice: product.price * product.quantity,
          $quantity: product.quantity,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      await saveTransactionQuery.finalizeAsync();
      await saveTransactionDetailsQuery.finalizeAsync();
      resetCart();
    }
  }
  return {
    saveTransaction
  };
}