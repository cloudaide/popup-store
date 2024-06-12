import { StyleSheet, Animated, View, Text } from "react-native";
import IProduct from "../types/IProduct";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";

interface TransactionItemProps {
  productInfo: IProduct;
  quantity: number;
  handleDelete: () => void;
}

export default function TransactionItem({ productInfo, quantity, handleDelete }: TransactionItemProps) {
  const totalPrice: number =  quantity * productInfo.price;
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<any>,
    dragAnimatedValue: Animated.AnimatedInterpolation<any>,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.deleteButton, {opacity}]}>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      childrenContainerStyle={{
        marginVertical: 12,
        backgroundColor: '#efefefe',
        padding: 5,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={{
          marginRight: 10,
          fontSize: 12,
          fontWeight: '600',
          width: 20,
        }}>{quantity.toString()}</Text>
        <Text style={{
          marginRight: 10,
          fontSize: 12,
          fontWeight: 'ultralight'
        }}>{productInfo?.description} - {productInfo?.product_name}</Text>
        <Text style={{
          fontSize: 12,
          marginLeft: 'auto',
          width: 30,
          textAlign: 'right',
        }}>{totalPrice}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
  },
});