import { Button, ScrollView, Text, View, ToastAndroid, Switch } from "react-native";
import useCart from "../hooks/useCart";
import { IProduct } from "../types/IProduct";
import TransactionItem from "./TransactionItem";
import { CartContextValues } from "../providers/CartProvider";
import useCheckout from "../hooks/useCheckout";
import { useState } from "react";
import AmountInputModal from "./AmountInputModal";

export default function TransactionList() {
  const { cart, total, removeFromCart }: CartContextValues = useCart();
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { saveTransaction } = useCheckout();
  const handleCheckout = async () => {
    await saveTransaction(cart, total, paymentMethod ? 'GCash' : 'Cash');
    ToastAndroid.show('Order successful', ToastAndroid.LONG);
    setPaymentMethod(false);
    setModalVisible(false);
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const toggleSwitch = () => {
    setPaymentMethod(!paymentMethod);
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
        height: '70%',
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
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text>Cash</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={paymentMethod ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={paymentMethod}
          />
          <Text>GCash</Text>
        </View>
      </View>
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
          <Button title="Checkout" onPress={showModal} disabled={!cart.length}/>
        </View>
      </View>
      <AmountInputModal total={total} showModal={modalVisible} checkoutHandler={handleCheckout} />
    </View>
  );
}
