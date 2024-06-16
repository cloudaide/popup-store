import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useReport() {
  const db = useSQLiteContext();
  const [dailyTransactions, setDailyTransactions] = useState<any[]>([]);
  const [dailyProducts, setDailyProducts] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState({ sales: 0, gcash: 0, cash: 0});
  const [categorizedProducts, setCategorizedProducts] = useState({});

  const getDailyTransactions = async () => {
    const transactionAsync = await db.prepareAsync(`
      SELECT * FROM transactions WHERE DATE(created_at) = $currentDate
    `);
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const transactionResult = await transactionAsync.executeAsync({ $currentDate: currentDate });
      const transactions = await transactionResult.getAllAsync();
      const currentSales = transactions.reduce((acc, curr) => {
        const sale = curr.total + acc.sales;
        let gcash = 0;
        let cash = 0;
        if (curr.payment_method.toLowerCase() === 'gcash') {
          gcash = curr.total;
        }

        if (curr.payment_method.toLowerCase() === 'cash') {
          cash = curr.total;
        }
        return {
          sales: sale,
          gcash: acc.gcash + gcash,
          cash: acc.cash + cash,
        }
      }, { sales: 0, gcash: 0, cash: 0});
      setTotalSales(currentSales)
      setDailyTransactions(transactions);
    } catch (e) {
      console.error(e);
    } finally {
      await transactionAsync.finalizeAsync();
    }
  }

  const getDailyTransactionProducts = async () => {
    const transactionProductAsync = await db.prepareAsync(`
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
        WHERE DATE(transaction_details.created_at) = $currentDate
        ORDER BY transaction_details.created_at DESC;`);
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const transactionResult = await transactionProductAsync.executeAsync({ $currentDate: currentDate });
      const products = await transactionResult.getAllAsync();
      const productCategories = products.reduce((acc, curr) => {
        const categoryObject = acc[curr.category_name];
        const quantity = categoryObject?.quantity || 0;
        const totalCost = categoryObject?.total || 0;
        const totalProducts = categoryObject?.products || [];

        return {
          ...acc,
          [curr.category_name]: {
            quantity: quantity + curr.quantity,
            total: totalCost + curr?.total_price,
            products: [...totalProducts, curr],
          }
        }
      }, {});

      setDailyProducts(products);
      setCategorizedProducts(productCategories);
    } catch (e) {
      console.error(e);
    } finally {
      await transactionProductAsync.finalizeAsync();
    }
  };

  const refetch = async () => {
    await getDailyTransactions();
    await getDailyTransactionProducts();
  }

  useFocusEffect(
    useCallback(() => {
      async function refetchData() {
        await refetch();
      }
      refetchData();
    }, [])
  );

  return {
    dailyTransactions,
    dailyProducts,
    refetch,
    totalSales,
    categorizedProducts,
  }
}