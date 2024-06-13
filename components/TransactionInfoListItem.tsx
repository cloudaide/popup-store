import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { ITransactions } from "../types/ITransactions";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TransactionInfoListItem({ item, handlePress }: { item: ITransactions, handlePress: () => void }) {
  return (
    <TouchableOpacity
      onPress={handlePress}
    >
      <View style={styles.container}>
        <Text style={styles.priceContent}>{item?.id?.toString()}</Text>
        <Text style={styles.priceContent}>{item?.total?.toString()}</Text>
        <Text style={{ ...styles.textContent, width: 100 }}>{item?.payment_method?.toString()}</Text>
        <Text style={styles.textContent}>{format(item?.created_at, 'MMMM dd, yyyy hh:mm a')}</Text>
        <Text style={styles.textContent}>{format(item?.updated_at, 'MMMM dd, yyyy hh:mm a')}</Text>
      </View>
    </TouchableOpacity>
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
    width: 150,
  }

});