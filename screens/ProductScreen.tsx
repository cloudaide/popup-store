import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { IProductWithCategory } from "../types/IProduct";
import ProductDetailModal from "../components/ProductDetailModal";

export default function ProductScreen() {
  const [products, setProducts] = useState<IProductWithCategory[]>([]);
  const [modalShown, setModalShown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProductWithCategory | null>(null);
  const db = useSQLiteContext();

  const categories = [
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

  const syncData = async () => {
    const saveCategory = await db.prepareAsync(`
      INSERT INTO categories (category_name, icon_path) VALUES ($categoryName, $iconPath)
    `);

    const saveProduct = await db.prepareAsync(`
      INSERT INTO products (category_id, product_name, description, extra_info, price)
      VALUES ($categoryId, $productName, $description, $extraInfo, $price)
    `);

    try {
      for (let category of categories) {
        const newCategory = await saveCategory.executeAsync({
          $categoryName: category.name,
          $iconPath: '/'
        });

        for (let product of category.products) {
          const newProduct = await saveProduct.executeAsync({
            $categoryId: newCategory.lastInsertRowId,
            $productName: product.product_name,
            $description: product.description,
            $extraInfo: 'e',
            $price: product.price,
          });
          console.log(newProduct);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      await saveCategory.finalizeAsync();
      await saveProduct.finalizeAsync();
    }
  };

  const getProducts = async () => {
    const categories: IProductWithCategory[] = await db.getAllAsync(`
      SELECT 
          products.id, categories.category_name, products.product_name, products.description, products.price, products.category_id,
          products.extra_info
      FROM categories
      LEFT JOIN products
      ON products.category_id = categories.id;
    `);
    setProducts(categories);
  }

  const handleRowPress = (product: IProductWithCategory) => {
    setSelectedProduct(product);
    setModalShown(true);
  }

  const closeModal = async () => {
    setModalShown(false);
    await getProducts();
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View>
      <FlatList data={products} renderItem={({ item }: { item: IProductWithCategory}) => {
        return (
          <View>
            <Pressable style={styles.rowPressable} onPress={() => handleRowPress(item)}>
              <Text style={{ flex: 1, }}>{item.product_name}</Text>
              <Text style={{ flex: 1, }}>{item.description}</Text>
              <Text style={{ flex: 1, }}>{item.category_name}</Text>
            </Pressable>
          </View>
        );
      }} />
      <ProductDetailModal product={selectedProduct} modalShown={modalShown}  closeModal={closeModal}/>
    </View>
  );
}

const styles = StyleSheet.create({
  rowPressable: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  }
});