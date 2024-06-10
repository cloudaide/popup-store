import { ScrollView, Text, View } from "react-native";
import useCart from "../hooks/useCart";
import IProduct from "../types/IProduct";
import TransactionItem from "./TransactionItem";
import { CartContextValues } from "../providers/CartProvider";

export default function TransactionList() {
  const { cart, total }: CartContextValues = useCart();

  return (
    <View style={{
      width: '30%',
      marginLeft: 10,
      backgroundColor: 'white',
      padding: 22,
      marginTop: 5,
      alignSelf: 'flex-start',
      height: '80%',
    }}>
      <ScrollView style={{
        height: '80%',
      }}>
        { cart?.map((product: IProduct) => (
            <TransactionItem key={`cart-${product.id}`} productInfo={product} quantity={product?.quantity || 0} />
          )
        )}
      </ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
        <Text>Total: {total}</Text>
      </View>
    </View>

  );
}