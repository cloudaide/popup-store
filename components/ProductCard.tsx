import { Image, View, Text } from "react-native";

interface ProductCardProps {
  imagePath: string;
  name: string;
  description: string;
}

export default function ProductCard({ imagePath, name, description }: ProductCardProps) {
  return (
    <View
      style={{
        margin: 5,
        padding: 20,
        backgroundColor: 'white',
        width: '24%',
        aspectRatio: '1/1',
      }}
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
            55
          </Text>
        </View>
      </View>
    </View>
  );
}