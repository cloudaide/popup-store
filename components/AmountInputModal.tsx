import { Modal, Pressable, View, Text, StyleSheet, ScrollView, Button, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { CartContextValues } from "../providers/CartProvider";
import useCart from "../hooks/useCart";
import { IProduct } from "../types/IProduct";
import TransactionItem from "./TransactionItem";

interface IAmountInputModal {
  showModal: boolean,
  checkoutHandler: () => void;
  total: number;
  hideModal: () => void;
}

export default function AmountInputModal({ hideModal, showModal, checkoutHandler, total }: IAmountInputModal) {
  const [amount, setAmount] = useState<string>('');
  const [customerChange, setCustomerChange] = useState<number>(0);
  const [checkoutVisible, setCheckoutVisible] = useState<boolean>(false);
  const { cart }: CartContextValues = useCart();
  const onPress = (input: number) => {
    if (input === -1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount(amount + input);
    }
  }

  const showModalPress = () => {
    if (customerChange >= 0) {
      setCheckoutVisible(true);
    } else {
      ToastAndroid.show('Payment less than total due.', 10);
    }
  }

  const checkoutPress = () => {
    setAmount('');
    setCheckoutVisible(false);
    setCustomerChange(0);
    checkoutHandler();
  }

  useEffect(() => {
    const newChange = parseInt(amount) - parseInt(String(total));
    setCustomerChange(newChange);
  }, [amount]);

  return (
    <Modal
      animationType="slide"
      visible={showModal}
    >
      {!checkoutVisible && (
        <>
          <Text style={styles.totalAmount}>{amount && new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP'}).format(parseInt(amount))}</Text>
          <View style={styles.numberContainer}>
            <Pressable onPress={() => onPress(1)} style={styles.inputContainer}><Text>1</Text></Pressable>
            <Pressable onPress={() => onPress(2)} style={styles.inputContainer}><Text>2</Text></Pressable>
            <Pressable onPress={() => onPress(3)} style={styles.inputContainer}><Text>3</Text></Pressable>
            <Pressable onPress={() => onPress(4)} style={styles.inputContainer}><Text>4</Text></Pressable>
            <Pressable onPress={() => onPress(5)} style={styles.inputContainer}><Text>5</Text></Pressable>
            <Pressable onPress={() => onPress(6)} style={styles.inputContainer}><Text>6</Text></Pressable>
            <Pressable onPress={() => onPress(7)} style={styles.inputContainer}><Text>7</Text></Pressable>
            <Pressable onPress={() => onPress(8)} style={styles.inputContainer}><Text>8</Text></Pressable>
            <Pressable onPress={() => onPress(9)} style={styles.inputContainer}><Text>9</Text></Pressable>
            <Pressable style={styles.inputContainer} onPress={() => showModalPress()}>
              <Text>Pay</Text>
            </Pressable>
            <Pressable onPress={() => onPress(0)} style={styles.inputContainer}><Text>0</Text></Pressable>
            <Pressable onPress={() => onPress(-1)} style={styles.inputContainer}><Text>Del</Text></Pressable>
          </View>
        </>
      )}
      {checkoutVisible && (
        <View style={styles.transactionItemsContainer}>
          <ScrollView style={{
            height: '70%',
          }}>
            { cart?.map((product: IProduct) => (
                <TransactionItem
                  key={`cart-${product.id}`}
                  productInfo={product}
                  quantity={product?.quantity || 0}
                 handleDelete={() => {}}
                />
              )
            )}
          </ScrollView>
          <View style={styles.totalsContainer}>
            <View style={styles.totalLabelValue}>
              <Text style={styles.label}>Total: </Text>
              <Text style={styles.price}>{total}</Text>
            </View>
            <View style={styles.totalLabelValue}>
              <Text style={styles.label}>Amount: </Text>
              <Text style={styles.price}>{amount}</Text>
            </View>
            <View style={styles.totalLabelValue}>
              <Text style={styles.label}>Change:</Text>
              <Text style={styles.price}>{customerChange.toString()}</Text>
            </View>
          </View>
          <Button onPress={checkoutPress} title={'Pay'} />
        </View>
      )}
      <Button onPress={hideModal} title="Go back" />
    </Modal>
  );
}

const styles = StyleSheet.create({
  numberContainer: {
    justifyContent: 'space-evenly',
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 25,
    marginTop: 20,
  },
  inputContainer: {
    width: '30%',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 5,
  },
  totalAmount: {
    textAlign: 'right',
    alignItems: 'flex-end',
    paddingRight: 25,
  },
  transactionItemsContainer: {
    width: '50%',
    margin: 'auto',
  },
  totalsContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    width: '50%',
    marginBottom: 10,
  },
  totalLabelValue: {
    flexDirection: 'row',
  },
  label: {
    width: 100,
    textAlign: 'left',
  },
  price: {
    width: 100,
    textAlign: 'right',
  }
})