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

export default function ProductCard({ name, description, price, productDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        backgroundColor: 'white',
        width: '18%',
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
            width: '70%',
            height: '70%',
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
            <Text style={{
              fontSize: 10,
            }}>
              {description}
            </Text>
            <Text style={{
              fontSize: 10,
            }}>
              {name}
            </Text>
          </View>
          <View>
            <Text style={{
              fontSize: 14
            }}>
              {price.toString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}