import React, { Component } from "react";
import axios from "axios";
import Button from "../components/Button";
import Container from "../components/Container";

const url = "https://goramp.eu/api/gps";
const mins = 10;

export default class WorkScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: null,
      error: null,
      latitude: null,
      longitude: null,
      coordsWithTime: []
    };
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.getLocation(), mins * 60 * 1000);
    this.getLocation();
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  postDataToApi = async url => {
    const { navigation } = this.props;
    const number = navigation.getParam("number", "Nėra numerio");
    const { latitude, longitude, coordsWithTime } = this.state;
    const data = { number, latitude, longitude };
    const lastElement =
      coordsWithTime.length > 0
        ? coordsWithTime[coordsWithTime.length - 1]
        : { status: null };
    if (lastElement.status === "failed" && lastElement.status !== null) {
      let tempCoords = [...coordsWithTime];
      let tempCoord = tempCoords.pop();

      try {
        await this.postData(url, coordsWithTime[coordsWithTime.length - 1]);
        await this.postData(url, data);
        tempCoord.status = "successful";
        tempCoords.push(tempCoord);

        this.setState({
          coordsWithTime: [
            ...tempCoords,
            { latitude, longitude, status: "successful" }
          ]
        });
      } catch {
        this.setState({ coordsWithTime });
      }
    } else {
      try {
        await this.postData(url, data);
        this.setState({
          coordsWithTime: [
            ...coordsWithTime,
            { latitude, longitude, status: "successful" }
          ]
        });
      } catch {
        this.setState({
          coordsWithTime: [
            ...coordsWithTime,
            { latitude, longitude, status: "failed" }
          ]
        });
      }
    }
  };

  getLocation = () => {
    return navigator.geolocation.getCurrentPosition(
      this.geoSucces,
      this.geoFailure
    );
  };

  geoSucces = position => {
    this.setState({
      ready: true,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    this.postDataToApi(url);
  };

  geoFailure = err => {
    this.setState({
      error: err.message
    });
  };

  postData = (url, data) => {
    return axios
      .post(url, data)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  static navigationOptions = {
    header: null
  };
  render() {
    const { navigation } = this.props;
    const { latitude, longitude, coordsWithTime } = this.state;
    console.log("coordsWithTime", coordsWithTime);
    return (
      <Container>
        <Button
          onPress={() => navigation.navigate("Home", { number: "" })}
          buttonText="Baigti darbą"
        />
        <Button buttonText={`latitude: ${latitude}`} />
        <Button buttonText={`longitude: ${longitude}`} />
      </Container>
    );
  }
}
