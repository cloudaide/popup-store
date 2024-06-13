import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import OrderScreen from "./screens/OrderScreen";
import { SQLiteProvider } from "expo-sqlite/next";
import migrate from "./utils/migrations";
import 'react-native-gesture-handler';
import TransactionScreen from "./screens/TransactionScreen";
import { useEffect } from "react";
import { Text } from 'react-native';
import ProductScreen from "./screens/ProductScreen";
import DailySales from "./screens/DailySales";

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    // @ts-ignore
    if (Text.defaultProps == null) Text.defaultProps = {};
    // @ts-ignore
    Text.defaultProps.allowFontScaling = false;
  }, []);
  return (
    <SQLiteProvider databaseName="SliceStacks.db" onInit={migrate}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Orders" component={OrderScreen} />
          <Drawer.Screen name="Daily Sales" component={DailySales} />
          <Drawer.Screen name="Transactions" component={TransactionScreen} />
          <Drawer.Screen name="Products" component={ProductScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
