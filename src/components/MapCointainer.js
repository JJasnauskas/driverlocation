import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, StyleSheet } from "react-native";
import React from "react";

const markers = [
  { latitude: 55.931644, longitude: 24.128143 },
  { latitude: 55.936533, longitude: 24.136497 },
  { latitude: 55.94053, longitude: 24.142511 }
];

export default ({ latitude, longitude }, props) => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}
    >
      {markers.map(marker => (
        <Marker
          key={marker.latitude+marker.longitude}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
          title={"Title"}
          description={"Description"}
        />
      ))}
    </MapView>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
