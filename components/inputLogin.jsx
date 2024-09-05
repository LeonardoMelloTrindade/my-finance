import { TextInput, StyleSheet } from "react-native";

export default function InputLogin(props) {
  const { placeholder } = props;

  return <TextInput style={styles.input} placeholder={placeholder} />;
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#000',
        borderRadius: 10,
        paddingLeft: 75
    }
})