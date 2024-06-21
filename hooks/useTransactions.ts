import { useState } from "react";
import { ITransactionDetails, ITransactions } from "../types/ITransactions";
import { useSQLiteContext } from "expo-sqlite";

export default function useTransactions() {
  const [transactions, setTransactions] = useState<ITransactions[] | []>([]);
  const db = useSQLiteContext();

  const getTransactions = async () => {
    try {
      const dbTransactions: ITransactions[] = await db.getAllAsync(`
        SELECT 
            transactions.id,
            transactions.total,
            transactions.payment_method,
            transactions.payment_amount,
            transactions.created_at,
            transactions.updated_at
        FROM transactions
        ORDER BY created_at DESC;
      `);
      setTransactions(dbTransactions);
    } catch (e) {
      console.error(e);
    }

  };

  const getTransactionProducts = async (id: number) => {
    try {
      const products: ITransactionDetails[] = await db.getAllAsync(`
        SELECT 
            transaction_details.product_id,
            transaction_details.unit_price,
            transaction_details.total_price,
            transaction_details.quantity,
            products.product_name,
            products.description,
            categories.category_name
        FROM transaction_details 
        LEFT JOIN products
        ON products.id = transaction_details.product_id
        LEFT JOIN categories
        ON products.category_id = categories.id
        WHERE transaction_details.transaction_id=${id} 
        ORDER BY transaction_details.created_at DESC;
      `);

      if (products?.length) {
        return products;
      }

      return [];
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getTransactions,
    transactions,
    getTransactionProducts,
  };
}