import React, { Component } from "react";
import axios from "axios";
import Container from "../components/Container";
import MapContainer from "../components/MapCointainer";
import Spinner from "../components/Spinner";
// const url = "https://goramp.eu/api/gps";
const url = "http://driverlocation.herokuapp.com/api/gps";
const mins = 1;

export default class WorkScreen extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      ready: null,
      error: null,
      latitude: null,
      longitude: null,
      loading: null,
      failedCoords: [],
      markers: []
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
  };

  stopInterval = () => {
    clearInterval(this.timer);
  };

  postDataToApi = async url => {
    const { navigation } = this.props;
    const number = navigation.getParam("number", "Nėra numerio");
    const { latitude, longitude, failedCoords, markers } = this.state;
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
            ),
            markers: [...markers, failedCoord]
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
    const { failedCoords, markers } = this.state;
    const timestamp = new Date();
    try {
      await this.postData(url, data);
      this.setState({
        markers: [...markers, data]
      });
    } catch {
      this.setState({
        failedCoords: [...failedCoords, { latitude, longitude, timestamp }]
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

  finishWork = async () => {
    const { navigation } = this.props;
    this.stopInterval();
    await this.getLocation();
    navigation.navigate("Home", { number: "" });
  };

  static navigationOptions = {
    header: null
  };
  render() {
    const { loading, latitude, longitude, markers } = this.state;
    if (latitude !== null && longitude !== null) {
      return (
        <MapContainer
          latitude={latitude}
          longitude={longitude}
          onPress={() => this.finishWork()}
          buttonText="Baigti darbą"
          loading={loading}
          markers={markers}
        />
      );
    }
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}
