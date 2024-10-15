import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function ButtonAuth(props) {
  const { type, mode, color, route, navigation } = props;

  return (
    <Button
      mode={mode}
      buttonColor={color}
      onPress={() => navigation.navigate(route)}
      style={styles.button_size}
    >
      {type}
    </Button>
  );
} 

const styles = StyleSheet.create({
  button_size: {
    width: 170,
    marginHorizontal: 5,
  },
});
