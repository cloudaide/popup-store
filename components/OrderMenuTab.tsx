import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface OrderMenuTabProps {
  id: Number;
  categoryName: String;
  active?: boolean;
  onPress: (id: Number) => void;
}

export default function OrderMenuTab({ id, categoryName, active, onPress }: OrderMenuTabProps) {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        backgroundColor: active ? '#006989' : '#E88D67',
      }}
      onPress={() => onPress(id)}
    >
      <Text style={{
        fontSize: 22,
        color: active ? '#F3F7EC' : '#F3F7EC'
      }}>{categoryName}</Text>
    </TouchableOpacity>
  );
}