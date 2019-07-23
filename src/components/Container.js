import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";

const Container = props => (
  <ImageBackground
    source={require("../assets/images/background.jpg")}
    style={{ flex: 1 }}
  >
    <View style={styles.center}>{props.children}</View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Container;
