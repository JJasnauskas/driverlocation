import React, { Component } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from "../components/Container";
import Message from "../components/Message";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: "",
      numberValidated: null,
    };
  }

  onNumberChange = number => {
    this.setState({ number });
  };

  validateInput = input => {
    const { number } = this.state;
    const { navigation } = this.props;
    if (input.length <= 5 ){
      this.setState({
        numberValidated: false
      })
    } else {
      this.setState({
        numberValidated: true
      })
      navigation.navigate("Work", { number })
    }
  }

  static navigationOptions = {
    header: null
  };
  render() {
    const { number, numberValidated } = this.state;
    return (
      <Container>
        <Input
          defaultValue={number}
          onChangeText={number => this.onNumberChange(number)}
          value={number}
          placeholder="Įveskite transporto priemonės numerį"
        />
        {(!numberValidated && numberValidated !== null) && <Message type='warning' message="Numeris negali būti trumpesnis nei 6 simboliai" />}
        <Button
          onPress={() => this.validateInput(number)}
          buttonText="Pradėti darbą"
          loading={false}
        />
      </Container>
    );
  }
}
