import { View, Text } from "react-native";
import IProduct from "../types/IProduct";

interface TransactionItemProps {
  productInfo: IProduct;
  quantity: number;
}

export default function TransactionItem({ productInfo, quantity }: TransactionItemProps) {
  const totalPrice: number =  quantity * productInfo.price;

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
      }}>{quantity.toString()}</Text>
      <Text style={{
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'ultralight'
      }}>{productInfo?.description} - {productInfo?.product_name}</Text>
      <Text style={{
        fontSize: 16,
        marginLeft: 'auto',
        width: 30,
      }}>{totalPrice}</Text>
    </View>
  );
}
