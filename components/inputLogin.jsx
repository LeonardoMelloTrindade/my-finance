import { TextInput, StyleSheet } from "react-native";

export default function InputLogin(props) {
  const { placeholder, type } = props;

  const isPassword = type === "password";

  return <TextInput style={styles.input_global} placeholder={placeholder} textContentType={type} secureTextEntry={isPassword}/>;
}

const styles = StyleSheet.create({
  input_global: {
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    width: 350,
    height: 50,
    borderRadius: 100,
    textAlign: "center",
  },
});
