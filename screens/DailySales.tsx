import { ActivityIndicator, Text, View } from "react-native";
import useReport from "../hooks/useReport";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function DailySales() {
  const { dailyTransactions, refetch, dailyProducts, totalSales } = useReport();

  // useFocusEffect(useCallback(() => {
  //   refetch().catch((e) => console.log(e));
  // }, [refetch]));

  if (!dailyTransactions.length) {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <View>
        <Text>Total Sales: {totalSales.sales}</Text>
      </View>
      <View>
        <Text>GCash Sales: {totalSales.gcash}</Text>
      </View>
      <View>
        <Text>Cash Sales: {totalSales.cash}</Text>
      </View>
      <View>

      </View>
    </View>
  );
}