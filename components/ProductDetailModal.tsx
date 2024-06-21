import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View
} from "react-native";
import { IProductWithCategory } from "../types/IProduct";
import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";

interface IProductDetailModalProps {
  modalShown: boolean;
  product: IProductWithCategory | null;
  closeModal: () => void;
}

export default function ProductDetailModal({modalShown, product, closeModal}: IProductDetailModalProps) {
  const { saveProduct, refetchData } = useProduct();
  const [productDetails, setProductDetails] = useState<IProductWithCategory | null>(product);
  const updateValues = (key: string, textValue: string) => {
    if (productDetails) {
      const newObject = {...productDetails};
      setProductDetails({...newObject, [key]: textValue});
    }
  };

  const handleSave = async () => {
    await saveProduct({ ...productDetails });
    ToastAndroid.show('Updated product successfully.', 5)
    closeModal();
  }

  useEffect(() => {
    if (product) {
      setProductDetails({...product});
    }
  }, [product]);

  return (
    <Modal
      animationType="slide"
      visible={modalShown}
    >
      <View style={styles.container}>
        <TextInput style={styles.textInput} value={productDetails?.product_name} onChangeText={(e) => updateValues('product_name', e)}/>
        <TextInput style={styles.textInput} value={productDetails?.description}  onChangeText={(e) => updateValues('description', e)}/>
        <TextInput style={styles.textInput} value={productDetails?.extra_info}  onChangeText={(e) => updateValues('extra_info', e)}/>
        <TextInput style={styles.textInput} value={productDetails?.price.toString()} keyboardType="numeric"  onChangeText={(e) => updateValues('price', e)}/>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Save" onPress={handleSave}/>
          </View>
          <View style={styles.button}>
            <Button title="Cancel" color="orange" onPress={closeModal}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    gap: 10,
  },
  button: {
    flexGrow: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 5,
    marginBottom: 2
  },
  container: {
    padding: 10,
  },
})