import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import TransactionItem from "../components/TransactionItem";
import OrderMenuTab from "../components/OrderMenuTab";
import { useState } from "react";
import ICategory from "../types/ICategory";
import ProductTabContent from "../components/ProductTabContent";
import CartProvider from "../providers/CartProvider";

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState<Number>(1);

  const categories: ICategory[] = [
    { id: 1, name: 'Pizza', products: [
      { id: 1, product_name: 'Pepperoni', description: 'Solo Saver 6"', price: 79, category_id: 1 },
      { id: 2, product_name: 'Hawaiian', description: 'Solo Saver 6"', price: 79, category_id: 1 },
      { id: 3, product_name: '5 Cheese', description: 'Solo Saver 6"', price: 79, category_id: 1 },
      { id: 4, product_name: 'Pepperoni', description: 'Classic 10"', price: 229, category_id: 1 },
      { id: 5, product_name: '6 Cheese', description: 'Classic 10"', price: 229, category_id: 1 },
      { id: 6, product_name: 'Hawaiian', description: 'Classic 10"', price: 229, category_id: 1 },
      { id: 7, product_name: 'Bacon and Ham', description: 'Classic 10"', price: 229, category_id: 1 },
    ]},
    { id: 2, name: 'Fries', products: [
      { id: 8, product_name: 'Sour Cream', description: 'Medium', price: 59, category_id: 2 },
      { id: 9, product_name: 'Sour Cream', description: 'Large', price: 89, category_id: 2 },
      { id: 10, product_name: 'Sour Cream', description: 'Jumbo', price: 129, category_id: 2 },
      { id: 11, product_name: 'Sour Cream', description: 'Giant', price: 189, category_id: 2 },
      { id: 12, product_name: 'Sour Cream', description: 'Monster', price: 239, category_id: 2 },
      { id: 13, product_name: 'Cheese', description: 'Medium', price: 59, category_id: 2 },
      { id: 14, product_name: 'Cheese', description: 'Large', price: 89, category_id: 2 },
      { id: 15, product_name: 'Cheese', description: 'Jumbo', price: 129, category_id: 2 },
      { id: 16, product_name: 'Cheese', description: 'Giant', price: 189, category_id: 2 },
      { id: 17, product_name: 'Cheese', description: 'Monster', price: 239, category_id: 2 },
      { id: 18, product_name: 'BBQ', description: 'Medium', price: 59, category_id: 2 },
      { id: 19, product_name: 'BBQ', description: 'Large', price: 89, category_id: 2 },
      { id: 20, product_name: 'BBQ', description: 'Jumbo', price: 129, category_id: 2 },
      { id: 21, product_name: 'BBQ', description: 'Giant', price: 189, category_id: 2 },
      { id: 22, product_name: 'BBQ', description: 'Monster', price: 239, category_id: 2 },
      { id: 23, product_name: 'Sweet Corn', description: 'Medium', price: 59, category_id: 2 },
      { id: 24, product_name: 'Sweet Corn', description: 'Large', price: 89, category_id: 2 },
      { id: 25, product_name: 'Sweet Corn', description: 'Jumbo', price: 129, category_id: 2 },
      { id: 26, product_name: 'Sweet Corn', description: 'Giant', price: 189, category_id: 2 },
      { id: 27, product_name: 'Sweet Corn', description: 'Monster', price: 239, category_id: 2 },
    ]},
    { id: 3, name: 'Cheese Sticks', products: [
      { id: 28, product_name: 'Sour Cream', description: 'Medium', price: 59, category_id: 3 },
      { id: 29, product_name: 'Sour Cream', description: 'Large', price: 89, category_id: 3 },
      { id: 30, product_name: 'Sour Cream', description: 'Jumbo', price: 129, category_id: 3 },
      { id: 31, product_name: 'Cheese', description: 'Medium', price: 59, category_id: 3 },
      { id: 32, product_name: 'Cheese', description: 'Large', price: 89, category_id: 3 },
      { id: 33, product_name: 'Cheese', description: 'Jumbo', price: 129, category_id: 3 },
      { id: 34, product_name: 'BBQ', description: 'Medium', price: 59, category_id: 3 },
      { id: 35, product_name: 'BBQ', description: 'Large', price: 89, category_id: 3 },
      { id: 36, product_name: 'BBQ', description: 'Jumbo', price: 129, category_id: 3 },
      { id: 37, product_name: 'Sweet Corn', description: 'Medium', price: 59, category_id: 3 },
      { id: 38, product_name: 'Sweet Corn', description: 'Large', price: 89, category_id: 3 },
      { id: 39, product_name: 'Sweet Corn', description: 'Jumbo', price: 129, category_id: 3 },
    ]},
    { id: 4, name: 'Drinks', products: [
      { id: 40, product_name: 'Mountain Dew', description: 'Medium', price: 25, category_id: 4 },
      { id: 41, product_name: 'Coke', description: 'Medium', price: 25, category_id: 4 },
      { id: 42, product_name: 'Royal', description: 'Medium', price: 25, category_id: 4 },
      { id: 43, product_name: 'Water', description: 'Medium', price: 15, category_id: 4 },
    ]},
  ];

  const handlePress = (id: Number) => {
    setActiveTab(id);
  }


  return (
    <SafeAreaView style={{
      flexDirection: 'column',
    }}>
      <CartProvider>
        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          flexGrow: 1,
        }}>
          { categories?.map((category) => (
            <OrderMenuTab key={`category-${category.id}`} categoryName={category.name} onPress={handlePress} id={category.id} active={activeTab === category.id}/>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <ScrollView
            style={{
              width: '70%',
            }}
            contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", paddingBottom: 170, }}
          >
            <ProductTabContent category={categories?.find((cat) => cat.id === activeTab)} />
          </ScrollView>
          <View style={{
            width: '30%',
            marginLeft: 10,
            backgroundColor: 'white',
            padding: 22,
            marginTop: 5,
          }}>
            <ScrollView style={{
              height: '80%',
            }}>
              <TransactionItem productInfo={categories[0].products[0]} quantity={1} />
            </ScrollView>
            <View style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
              <Text>Total: 110</Text>
            </View>
          </View>
        </View>
      </CartProvider>
    </SafeAreaView>
  );
}
