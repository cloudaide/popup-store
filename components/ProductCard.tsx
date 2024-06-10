import { Image, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCart from "../hooks/useCart";
import IProduct from "../types/IProduct";

interface ProductCardProps {
  imagePath: string;
  name: string;
  description: string;
  price: number;
  productDetails: IProduct;
}

export default function ProductCard({ imagePath, name, description, price, productDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <View
      style={{
        margin: 5,
        padding: 20,
        backgroundColor: 'white',
        width: '23%',
        aspectRatio: '1/1',
      }}
    >
      <TouchableOpacity
        onPress={() => addToCart(productDetails, 1)}
      >
        <View style={{
          alignItems: 'center',
        }}>
          <Image source={require('../assets/pepperoni.png')} style={{
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
          }}/>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <View
            style={{
              width: '80%',
            }}
          >
            <Text>
              {description}
            </Text>
            <Text>
              {name}
            </Text>
          </View>
          <View>
            <Text style={{
              fontSize: 26
            }}>
              {price.toString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}