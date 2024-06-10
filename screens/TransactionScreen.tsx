import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { Text } from 'react-native';

export default function TransactionScreen() {
  const db = useSQLiteContext();
  useEffect(() => {
    db.withTransactionAsync(async () => {
      const transactions = await db.getAllAsync('SELECT * FROM transactions;')
      const transactionDetails = await db.getAllAsync('SELECT * FROM transaction_details;')
      console.log(transactionDetails);
    }).then(r => console.log(r));
  }, []);
  return (
    <Text>Transactions</Text>
  );
}