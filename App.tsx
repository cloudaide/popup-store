import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import OrderScreen from "./screens/OrderScreen";
import { SQLiteProvider } from "expo-sqlite/next";
import migrate from "./utils/migrations";
import 'react-native-gesture-handler';
import TransactionScreen from "./screens/TransactionScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SQLiteProvider databaseName="SliceStack.db" onInit={migrate}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Orders" component={OrderScreen} />
          <Drawer.Screen name="Transactions" component={TransactionScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
