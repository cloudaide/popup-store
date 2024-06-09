import { Image, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCart from "../hooks/useCart";

interface ProductCardProps {
  imagePath: string;
  name: string;
  description: string;
  price: number;
}

export default function ProductCard({ imagePath, name, description, price }: ProductCardProps) {
  const cart = useCart();
  console.log(cart);

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
      <TouchableOpacity>
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