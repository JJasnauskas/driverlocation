import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Spinner from "./Spinner";

const FloatButton = ({ onPress, buttonText, loading }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
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
    borderRadius: 20,
    position: 'absolute',
    bottom: 15,
    alignSelf: "center"
  },
  whiteLarge: {
    color: "#fff",
    fontSize: 20
  }
});

export default FloatButton;
