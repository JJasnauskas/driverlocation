import React, { Component } from "react";
import axios from "axios";
import Button from "../components/Button";
import Container from "../components/Container";

// const url = "https://goramp.eu/api/gps";
const url = "http://driverlocation.herokuapp.com/api/gps";
const mins = 0.1;

export default class WorkScreen extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      ready: null,
      error: null,
      latitude: null,
      longitude: null,
      failedCoords: [],
      loading: false
    };
  }

  componentDidMount = async () => {
    await this.getLocation();
    this.startInterval();
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startInterval = () => {
    this.timer = setInterval(() => this.getLocation(), mins * 60 * 1000);
  }

  stopInterval = () => {
    clearInterval(this.timer);
  }

  postDataToApi = async url => {
    const { navigation } = this.props;
    const number = navigation.getParam("number", "Nėra numerio");
    const { latitude, longitude, failedCoords } = this.state;
    const timestamp = new Date();
    const data = { number, latitude, longitude, timestamp };
    if (failedCoords.length > 0) {
      this.setState({ loading: true });
      await this.asyncForEach(failedCoords, async failedCoord => {
        try {
          await this.postData(url, failedCoord);
          this.setState({
            failedCoords: failedCoords.filter(
              filterCoord => filterCoord !== failedCoord
            )
          });
        } catch {}
      });
      this.tryCatchPostData(data, latitude, longitude);
      this.setState({ loading: false });
    } else {
      this.tryCatchPostData(data, latitude, longitude);
    }
  };

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  tryCatchPostData = async (data, latitude, longitude) => {
    const { failedCoords } = this.state;
    const timestamp = new Date();
    try {
      await this.postData(url, data);
    } catch {
      this.setState({
        failedCoords: [
          ...failedCoords,
          { latitude, longitude, timestamp }
        ]
      });
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

  finishWork = () => {
    const { navigation } = this.props;
    this.stopInterval();
    this.getLocation();
    navigation.navigate("Home", { number: "" });
  };

  static navigationOptions = {
    header: null
  };
  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    return (
      <Container>
        <Button
          onPress={() => this.finishWork()}
          buttonText="Baigti darbą"
          loading={loading}
        />
      </Container>
    );
  }
}
