import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: ""
    };
  }

  onNumberChange = number => {
    this.setState({ number });
  };

  static navigationOptions = {
    header: null
  };
  render() {
    const { navigation } = this.props;
    const { number } = this.state;
    return (
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <TextInput
            style={[styles.input, styles.marginBottomLarge]}
            defaultValue={number}
            onChangeText={number => this.onNumberChange(number)}
            value={number}
            placeholderTextColor="#fff"
            placeholder="Įveskite transporto priemonės numerį"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Work", { number })}
          >
            <Text style={styles.whiteLarge}>Pradėti darbą</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#5dbd5e",
    borderRadius: 20
  },
  input: {
    paddingHorizontal: 15,
    width: '70%',
    color: "#fff",
    backgroundColor: "#5dbd5e",
    borderRadius: 20
  },
  marginBottomLarge: {
    marginBottom: 40
  },
  whiteLarge: {
    color: "#fff",
    fontSize: 20
  }
});
