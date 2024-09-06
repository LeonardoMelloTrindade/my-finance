import { TextInput, StyleSheet } from "react-native";

export default function InputLogin(props) {
  const { placeholder } = props;

  return <TextInput style={styles.input} placeholder={placeholder} />;
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 20,
        width: 350,
        height: 50,
        borderRadius: 100,
        paddingLeft: 10
    }
})