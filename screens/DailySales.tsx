import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import useReport from "../hooks/useReport";

export default function DailySales() {
  const {
    loading,
    categorizedProducts,
    totalSales
  } = useReport();

  if (loading) {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.totalsContainer}>
        <View style={styles.totalsPill}>
          <Text style={styles.totalsText}>Total Sales</Text>
          <Text style={styles.totalsText}>{totalSales.sales}</Text>
        </View>
        <View style={styles.totalsPill}>
          <Text style={styles.totalsText}>GCash Sales</Text>
          <Text style={styles.totalsText}>{totalSales.gcash}</Text>
        </View>
        <View style={styles.totalsPill}>
          <Text style={styles.totalsText}>Cash Sales</Text>
          <Text style={styles.totalsText}>{totalSales.cash}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles?.categoryContainer}>
        {
          Object.keys(categorizedProducts)?.map((category: string) => (
            <View key={`category-pill-${category}`} style={styles.categoryPill}>
              <Text>{category}</Text>
              <Text>Quantity: {categorizedProducts[category]?.quantity}</Text>
              <Text>Total Sales: {categorizedProducts[category]?.total}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  totalsPill: {
    borderRadius: 20,
    width: '32%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAAB36'
  },
  totalsText: {
    color: '#FFF'
  },
  categoryContainer: {
    justifyContent: 'space-evenly',
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 25,
    marginTop: 20,
  },
  categoryPill: {
    borderRadius: 10,
    width: '30%',
    backgroundColor: '#249EA0',
    padding: 10,
    marginBottom: 10,
  }
})