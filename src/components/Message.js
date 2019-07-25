import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = ({ message, type }) => (
  <View style={type === "warning" && styles.warning}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  warning: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 20,
    marginBottom: 40
  },
  text: {
    color: "#fff",
    fontSize: 15,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Message;
