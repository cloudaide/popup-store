import { ActivityIndicator, FlatList, StyleSheet, View, Text, Modal, Button } from 'react-native';
import useTransactions from "../hooks/useTransactions";
import TransactionInfoListItem from "../components/TransactionInfoListItem";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ITransactionDetails } from "../types/ITransactions";

export default function TransactionScreen() {
  const { transactions, getTransactions, getTransactionProducts } = useTransactions();
  const [selectedProducts, setSelectedProducts] = useState<ITransactionDetails[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleTransactionPress = async (id: number) => {
    const products: ITransactionDetails[] | undefined = await getTransactionProducts(id);

    if (products) {
      setSelectedProducts(products);
    }
    setShowModal(true);
  }

  useFocusEffect(useCallback(() => {
    getTransactions().catch((e) => console.log(e));
  }, [getTransactions]));

  if (!transactions.length) {
    return <ActivityIndicator/>
  }

  const totalSales = transactions.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <View style={styles.container}>
      <View style={styles.totalsContainer}>
        <View style={styles.totalPill}>
          <Text style={styles.heading}>Total Sales: </Text>
          <Text style={styles.totalText}>{ totalSales }</Text>
        </View>
        <View style={styles.totalPill}>
          <Text style={styles.heading}>Sold Items:</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={transactions}
        renderItem={({ item }) => {
          return (
            <TransactionInfoListItem item={item} handlePress={() => handleTransactionPress(item.id)}/>
          );
        }
      } />
      <Modal
        animationType="slide"
        visible={showModal}
      >
        <View>
          <Button title="Close" onPress={() => setShowModal(false)}/>
          {selectedProducts ? (
            <FlatList data={selectedProducts} renderItem={
              ({ item }: { item: ITransactionDetails}) => {
                return (
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.category_name}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.description}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.product_name}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.quantity}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.unit_price}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.total_price}
                      </Text>
                    </View>
                  </View>
                );
              }
            } />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalsContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    padding: 10,
    gap: 15,
    justifyContent: 'space-between',
  },
  totalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '49%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#006989',
    padding: 20,
    backgroundColor: '#006989',
  }
})