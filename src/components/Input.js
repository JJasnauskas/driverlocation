import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ defaultValue, onChangeText, value, placeholder}) => (
    <TextInput
    style={[styles.input, styles.marginBottomLarge]}
    defaultValue={defaultValue}
    onChangeText={onChangeText}
    value={value}
    placeholderTextColor="#fff"
    placeholder={placeholder}
  />
)

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        width: "70%",
        color: "#fff",
        backgroundColor: "#5dbd5e",
        borderRadius: 20
      },
      marginBottomLarge: {
        marginBottom: 40
      }
})

export default Input;