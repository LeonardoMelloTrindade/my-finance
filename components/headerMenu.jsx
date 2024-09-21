import { StyleSheet, View, Image } from "react-native";
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import colorsDefault from "../styles/colors";

export default function HeaderMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container_header}>
      <View style={styles.container_image_profile}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.image_profile}
        />
      </View>
      <View style={styles.container_button_config}>
        <Button
         onPress={() => navigation.navigate("Login")}
         contentStyle={styles.btn_config}
         icon={() => (
          <Image
            source={require('../assets/config-icon.png')}
            style={styles.iconStyle}

          />
        )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    backgroundColor: colorsDefault.primary,
    alignItems: 'center',
  },
  container_image_profile: {
    marginHorizontal: 35,
  },
  container_button_config: {
    marginHorizontal: 15,
  },
  image_profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white'

  },
  btn_config: {
    width: 40,
    height: 40,
  },
  iconStyle: {
    width: 30,
    height: 30,
  }

});
