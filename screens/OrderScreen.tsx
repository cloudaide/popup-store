import { ScrollView, View } from "react-native";
import OrderMenuTab from "../components/OrderMenuTab";
import { useState } from "react";
import ICategory from "../types/ICategory";
import ProductTabContent from "../components/ProductTabContent";
import CartProvider from "../providers/CartProvider";
import TransactionList from "../components/TransactionList";

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState<Number>(1);

  const categories: ICategory[] = [
    {
      id: 1, name: 'Pizza', products: [
        { id: 1, product_name: 'Pepperoni', description: 'Solo Saver 6"', price: 79, category_id: 1 },
        { id: 2, product_name: 'Hawaiian', description: 'Solo Saver 6"', price: 79, category_id: 1 },
        { id: 3, product_name: '5 Cheese', description: 'Solo Saver 6"', price: 79, category_id: 1 },
        { id: 4, product_name: 'Pepperoni', description: 'Classic 10"', price: 229, category_id: 1 },
        { id: 5, product_name: '6 Cheese', description: 'Classic 10"', price: 229, category_id: 1 },
        { id: 6, product_name: 'Hawaiian', description: 'Classic 10"', price: 229, category_id: 1 },
        { id: 7, product_name: 'Bacon and Ham', description: 'Classic 10"', price: 229, category_id: 1 },
      ]
    },
    { id: 2, name: 'Fries', products: [
      { id: 8, product_name: 'Sour Cream', description: 'Medium', price: 59, category_id: 2 },
      { id: 9, product_name: 'Sour Cream', description: 'Large', price: 89, category_id: 2 },
      { id: 10, product_name: 'Sour Cream', description: 'Jumbo', price: 129, category_id: 2 },
      { id: 11, product_name: 'Sour Cream', description: 'Giant', price: 189, category_id: 2 },
      { id: 12, product_name: 'Sour Cream', description: 'Monster', price: 239, category_id: 2 },
    ]},
    { id: 3, name: 'Cheese Sticks', products: [
      { id: 28, product_name: 'Sour Cream', description: 'Medium', price: 59, category_id: 3 },
      { id: 29, product_name: 'Sour Cream', description: 'Large', price: 89, category_id: 3 },
      { id: 30, product_name: 'Sour Cream', description: 'Jumbo', price: 129, category_id: 3 },
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
    <View style={{
      flexDirection: 'column',
      paddingTop: 0,
    }}>
      <CartProvider>
        <View style={{
          flexDirection: 'row',
          height: '100%',
          marginTop: 0,
        }}>
          <View style={{
            width: '70%',
          }}>
            <View style={{
              marginBottom: 10,
              flexDirection: 'row',
              paddingTop: 10,
            }}>
              { categories?.map((category) => (
                <OrderMenuTab key={`category-${category.id}`} categoryName={category.name} onPress={handlePress} id={category.id} active={activeTab === category.id}/>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: '90%',
              }}
            >
              <ScrollView
                contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", paddingBottom: 25, }}
              >
                <ProductTabContent category={categories?.find((cat) => cat.id === activeTab)} />
              </ScrollView>
            </View>
          </View>
          <TransactionList />
        </View>
      </CartProvider>
    </View>
  );
}
