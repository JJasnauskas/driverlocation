import React, { Component } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from "../components/Container";

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
      <Container>
        <Input
          defaultValue={number}
          onChangeText={number => this.onNumberChange(number)}
          value={number}
          placeholder="Įveskite transporto priemonės numerį"
        />
        <Button
          onPress={() => navigation.navigate("Work", { number })}
          buttonText="Pradėti darbą"
        />
      </Container>
    );
  }
}
