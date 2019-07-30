import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Spinner from "./Spinner";

const Button = ({ onPress, buttonText, loading, buttonStyle }) => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress} disabled={loading}>
      {!loading ? (
        <Text style={styles.whiteLarge}>{buttonText}</Text>
      ) : (
        <Spinner />
      )}
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
