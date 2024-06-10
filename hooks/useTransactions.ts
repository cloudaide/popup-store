import { useEffect, useState } from "react";
import { ITransactions } from "../types/ITransactions";
import { useSQLiteContext } from "expo-sqlite";

export default function useTransactions() {
  const [transactions, setTransactions] = useState<ITransactions[] | []>([]);
  const db = useSQLiteContext();

  const getTransactions = async () => {
    try {
      const dbTransactions: ITransactions[] = await db.getAllAsync(`
      SELECT id, total, created_at, updated_at FROM transactions ORDER BY created_at DESC;
    `);
      setTransactions(dbTransactions);
    } catch (e) {
      console.error(e);
    }

  };

  return {
    getTransactions,
    transactions,
  };
}