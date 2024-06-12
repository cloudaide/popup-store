import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { ITransactions } from "../types/ITransactions";

export default function TransactionInfoListItem({ item }: { item: ITransactions}) {
  return (
    <View style={styles.container}>
      <Text style={styles.priceContent}>{item?.id?.toString()}</Text>
      <Text style={styles.priceContent}>{item?.total?.toString()}</Text>
      <Text style={styles.textContent}>{format(item?.created_at, 'MMMM dd, yyyy hh:mm a')}</Text>
      <Text style={styles.textContent}>{format(item?.updated_at, 'MMMM dd, yyyy hh:mm a')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    color: '#FFFFFF',
    padding: 20,
    backgroundColor: '#E88D67',
    gap: 10,
    marginTop: 10,
  },
  textContent: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  priceContent: {
    color: '#FFFFFF',
    fontSize: 14,
    width: 200,
  }

});