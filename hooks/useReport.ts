import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { IProductCategories, ITransactionProduct } from "../types/IProduct";
import { ISalesTotal, ITransactions } from "../types/ITransactions";

export default function useReport() {
  const db = useSQLiteContext();
  const [dailyTransactions, setDailyTransactions] = useState<any[]>([]);
  const [dailyProducts, setDailyProducts] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState({ sales: 0, gcash: 0, cash: 0});
  const [categorizedProducts, setCategorizedProducts] = useState<IProductCategories>({});
  const [loading, setLoading] = useState<boolean>(false);
  const isITransactions = (obj: any): obj is ITransactions => {
    return (
      typeof obj.id === 'number' &&
      typeof obj.total === 'number' &&
      typeof obj.payment_method === 'string' &&
      typeof obj.created_at === 'string'
    );
  };

  const getDailyTransactions = async () => {
    const transactionAsync = await db.prepareAsync(`
      SELECT * FROM transactions WHERE DATE(created_at) = $currentDate
    `);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const transactionResult = await transactionAsync.executeAsync({ $currentDate: currentDate });
      const unknownTransactions = await transactionResult.getAllAsync();
      const transactions = unknownTransactions.filter(isITransactions) as ITransactions[];

      const currentSales: ISalesTotal = transactions.reduce((acc: ISalesTotal, curr: ITransactions) => {
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

  const isITransactionProduct = (obj: any): obj is ITransactionProduct => {
    return (
      typeof obj.product_id === 'number' &&
      typeof obj.unit_price === 'number' &&
      typeof obj.total_price === 'number' &&
      typeof obj.quantity === 'number' &&
      typeof obj.product_name === 'string' &&
      typeof obj.description === 'string' &&
      typeof obj.category_name === 'string'
    );
  };

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
                 LEFT JOIN products ON products.id = transaction_details.product_id
                 LEFT JOIN categories ON products.category_id = categories.id
        WHERE DATE(transaction_details.created_at) = $currentDate
        ORDER BY transaction_details.created_at DESC;
    `);

    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const transactionResult = await transactionProductAsync.executeAsync({ $currentDate: currentDate });
      const unknownProducts = await transactionResult.getAllAsync();

      const products = unknownProducts.filter(isITransactionProduct) as ITransactionProduct[];

      const productCategories: IProductCategories = products.reduce((acc, curr) => {
        const categoryObject = acc[curr.category_name] || { quantity: 0, total: 0, products: [] };

        return {
          ...acc,
          [curr.category_name]: {
            quantity: categoryObject.quantity + curr.quantity,
            total: categoryObject.total + curr.total_price,
            products: [...categoryObject.products, curr],
          },
        };
      }, {} as IProductCategories);

      setDailyProducts(products);
      setCategorizedProducts(productCategories);
    } catch (e) {
      console.error(e);
    } finally {
      await transactionProductAsync.finalizeAsync();
    }
  };

  const refetch = async () => {
    setLoading(true);
    await getDailyTransactions();
    await getDailyTransactionProducts();
    setLoading(false);
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
    loading,
  }
}