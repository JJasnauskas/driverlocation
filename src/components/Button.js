import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ onPress, buttonText }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.whiteLarge}>{buttonText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#5dbd5e",
    borderRadius: 20
  },
  whiteLarge: {
    color: "#fff",
    fontSize: 20
  }
});

export default Button;
