import { View, Text } from "react-native";

export default function TransactionItem() {
  return (
    <View style={{
      flexDirection: 'row',
      marginVertical: 12,
      backgroundColor: '#efefefe',
      padding: 10,
      borderRadius: 5,
    }}>
      <Text style={{
        marginRight: 10,
        fontSize: 16,
        fontWeight: '600',
        width: 20,
      }}>2</Text>
      <Text style={{
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'ultralight'
      }}>Solo Saver 6" - Pepperoni</Text>
      <Text style={{
        fontSize: 16,
        marginLeft: 'auto',
        width: 30,
      }}>110</Text>
    </View>
  );
}
