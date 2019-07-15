import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import axios from "axios";

const apiUrl = "https://farm-track.herokuapp.com/api/gps";
// const apiUrl = "https://goramp.eu/api/gps";
const mins = 0.05;

export default class WorkScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      ready: false,
      latitude: null,
      longitude: null ,
      error: null
    }
    // this.getLocationAndPostData(apiUrl);
  }
  
  componentDidMount = async () => {
    // let geoOptions = {
    //   enableHighAccuracy: true,
    //   timeOut: mins * 60000,
    //   maximumAge: 60 * 60 * 8
    // };
    this.timer = setInterval(()=> this.getLocationAndPostData(apiUrl), mins * 60 * 1000)
    this.setState({ ready: false, error: null })
    await this.getLocation();
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getLocationAndPostData = async(url) => {
    await this.getLocation();
    await this.postDataToApi(url)
  }

  postDataToApi = async (url) => {
    const { navigation } = this.props;
    const number = navigation.getParam("number", "Nėra numerio");
    const { latitude, longitude } = this.state;
    const data = { number, latitude, longitude };
    try {
      const postedData = await this.postData(
        url,
        data
      );
      console.log("success", postedData);
    } catch (error) {
      console.log("Ivyko klaida");
      console.log(error);
    }
  }

  getLocation = () => {
    console.log('getting location...')
    return navigator.geolocation.getCurrentPosition(this.geoSucces, this.geoFailure);
  }

  geoSucces = (position) => {
    this.setState({ ready: true, latitude: position.coords.latitude, longitude: position.coords.longitude })
  }

  geoFailure = (err) => {
    this.setState({
      error: err.message
    })
  }

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
    const { ready, error, latitude, longitude } = this.state;
    console.log('state lat', latitude);
    console.log('state lng', longitude);
    return (
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1 }}
      >
        <View style={styles.center}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home", { number: ''})}
          >
            <Text style={styles.whiteLarge}>Baigti darbą</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  center: {
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
  whiteLarge: {
    color: '#fff',
    fontSize: 20
  }
});
