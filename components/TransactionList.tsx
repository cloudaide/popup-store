import { Button, ScrollView, Text, View, ToastAndroid } from "react-native";
import useCart from "../hooks/useCart";
import IProduct from "../types/IProduct";
import TransactionItem from "./TransactionItem";
import { CartContextValues } from "../providers/CartProvider";
import useCheckout from "../hooks/useCheckout";

export default function TransactionList() {
  const { cart, total, removeFromCart }: CartContextValues = useCart();
  const { saveTransaction } = useCheckout();
  const handleCheckout = async () => {
    await saveTransaction(cart, total);
    ToastAndroid.show('Order successful', ToastAndroid.LONG);
  }

  return (
    <View style={{
      width: '30%',
      marginLeft: 10,
      backgroundColor: 'white',
      paddingHorizontal: 22,
      paddingVertical: 10,
      alignSelf: 'flex-start',
    }}>
      <ScrollView style={{
        height: '80%',
      }}>
        { cart?.map((product: IProduct) => (
            <TransactionItem
              key={`cart-${product.id}`}
              productInfo={product}
              quantity={product?.quantity || 0}
              handleDelete={() => removeFromCart(product.id)}
            />
          )
        )}
      </ScrollView>
      <View style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
        <View style={{
          justifyContent: 'flex-start',
        }}>
          <Text>Total: {total}</Text>
        </View>
        <View>
          <Button title="Checkout" onPress={handleCheckout}/>
        </View>
      </View>
    </View>
  );
}
