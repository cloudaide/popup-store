import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import TransactionItem from "../components/TransactionItem";

export default function OrderScreen() {
  return (
    <SafeAreaView style={{
      flexDirection: 'row',
    }}>
      <ScrollView
        style={{
          width: '70%',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <View style={{
          flexDirection: 'row',
          width: '100%',
        }}>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
          <ProductCard  imagePath="" name="Pepperoni" description='Solo Saver 6"'/>
        </View>
      </ScrollView>
      <View style={{
        width: '30%',
        marginLeft: 10,
        backgroundColor: 'white',
        padding: 22,
        marginTop: 5,
      }}>
        <ScrollView style={{
          maxHeight: '80%',
        }}>
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
        </ScrollView>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
          <Text>Total: 110</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
