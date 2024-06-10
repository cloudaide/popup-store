import { ActivityIndicator, FlatList, StyleSheet, View, Text, ScrollView } from 'react-native';
import useTransactions from "../hooks/useTransactions";
import { format } from 'date-fns';
import TransactionInfoListItem from "../components/TransactionInfoListItem";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function TransactionScreen() {
  const { transactions, getTransactions } = useTransactions();
  useFocusEffect(useCallback(() => {
    getTransactions().catch((e) => console.log(e));
  }, [getTransactions]));
  if (!transactions.length) {
    return <ActivityIndicator/>
  }

  const totalSales = transactions.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <View style={styles.container}>
      <View style={styles.totalsContainer}>
        <View style={styles.totalPill}>
          <Text style={styles.heading}>Total Sales: </Text>
          <Text style={styles.totalText}>{ totalSales }</Text>
        </View>
        <View style={styles.totalPill}>
          <Text style={styles.heading}>Sold Items:</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={transactions}
        renderItem={({ item }) => {
        return (
          <TransactionInfoListItem item={item} />
        );
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalsContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    padding: 10,
    gap: 15,
    justifyContent: 'space-between',
  },
  totalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '49%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#006989',
    padding: 20,
    backgroundColor: '#006989',
  }
})