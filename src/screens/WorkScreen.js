import React, { Component } from "react";
import axios from "axios";
import MapContainer from "../components/MapCointainer";
import Spinner from "../components/Spinner";
import { Dimensions, Animated } from 'react-native'
import Geolocation from "@react-native-community/geolocation";
// const url = "https://goramp.eu/api/gps";
const url = "http://driverlocation.herokuapp.com/api/gps";
const mins = .1;

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const markers = [
  {
    coordinate: {
      latitude: 45.524548,
      longitude: -122.6749817,
    },
    title: "Best Place",
    description: "This is the best place in Portland",
    image: Images[0],
  },
  {
    coordinate: {
      latitude: 45.524698,
      longitude: -122.6655507,
    },
    title: "Second Best Place",
    description: "This is the second best place in Portland",
    image: Images[1],
  },
  {
    coordinate: {
      latitude: 45.5230786,
      longitude: -122.6701034,
    },
    title: "Third Best Place",
    description: "This is the third best place in Portland",
    image: Images[2],
  },
  {
    coordinate: {
      latitude: 45.521016,
      longitude: -122.6561917,
    },
    title: "Fourth Best Place",
    description: "This is the fourth best place in Portland",
    image: Images[3],
  },
];

const region = {
  latitude: 45.52220671242907,
  longitude: -122.6653281029795,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class WorkScreen extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      ready: null,
      error: null,
      loading: null,
      currentPosition: null,
      failedCoords: [],
      markers,
      region
    };
  }

  componentDidMount = async () => {
    console.log('buvo', { latitude: 54.8980077,
      longitude: 23.9090116})
    // await this.getLocation();
    // this.startInterval();
    // await this.watchPosition()
  };

  componentWillUnmount() {
    this.stopInterval();
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  startInterval = () => {
    this.timer = setInterval(() => this.getLocation(), mins * 60 * 1000);
  };

  stopInterval = () => {
    clearInterval(this.timer);
  };

  // postDataToApi = async url => {
  //   const { navigation } = this.props;
  //   const number = navigation.getParam("number", "Nėra numerio");
  //   const { latitude, longitude, failedCoords, markers } = this.state;
  //   const timestamp = new Date();
  //   const data = { number, latitude, longitude, timestamp };
  //   if (failedCoords.length > 0) {
  //     this.setState({ loading: true });
  //     await this.asyncForEach(failedCoords, async failedCoord => {
  //       try {
  //         await this.postData(url, failedCoord);
  //         this.setState({
  //           failedCoords: failedCoords.filter(
  //             filterCoord => filterCoord !== failedCoord
  //           ),
  //           markers: [...markers, failedCoord]
  //         });
  //       } catch {}
  //     });
  //     this.tryCatchPostData(data, latitude, longitude);
  //     this.setState({ loading: false });
  //   } else {
  //     this.tryCatchPostData(data, latitude, longitude);
  //   }
  // };

  // asyncForEach = async (array, callback) => {
  //   for (let index = 0; index < array.length; index++) {
  //     await callback(array[index], index, array);
  //   }
  // };

  // tryCatchPostData = async (data, latitude, longitude) => {
  //   const { failedCoords, markers } = this.state;
  //   const timestamp = new Date();
  //   try {
  //     await this.postData(url, data);
  //     this.setState({
  //       markers: [...markers, data]
  //     });
  //   } catch {
  //     this.setState({
  //       failedCoords: [...failedCoords, { latitude, longitude, timestamp }]
  //     });
  //   }
  // };

  getLocation = () => {
    console.log('bandau gaut vieta')
    return Geolocation.getCurrentPosition(
      this.geoSucces,
      this.geoFailure
    );
  };

  watchPosition = () => {
    return Geolocation.watchPosition(this.geoSucces, this.geoFailure)
  }

  geoSucces = position => {
    const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
    this.setState({
      ready: true,
      currentPosition: coords,
      // markers: [...this.state.markers, coords]
    }, () => console.log(this.state.currentPosition));
    // this.postDataToApi(url);
  };

  geoFailure = err => {
    this.setState({
      error: err.message
    });
  };

  // postData = (url, data) => {
  //   return axios
  //     .post(url, data)
  //     .then(response => response.data)
  //     .catch(error => {
  //       throw error;
  //     });
  // };

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
    const { currentPosition, loading, markers } = this.state;
    if (currentPosition === null) {
      return (
        <MapContainer
          onPress={() => this.finishWork()}
          buttonText="Baigti darbą"
          loading={loading}
          markers={markers}
          state={this.state}
          currentPosition={currentPosition}
        />
      );
    }
    return (
        <Spinner />
    );
  }
}
