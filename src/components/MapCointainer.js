import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, StyleSheet, Animated, Text } from "react-native";
import React from "react";
import Button from "./Button";

export default ({ latitude, longitude, onPress, buttonText, loading, markers }) => (
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
          key={marker.latitude + marker.longitude}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
        >
        </Marker>
      ))}
    </MapView>
    <Button onPress={onPress} buttonStyle={{ position: 'absolute', bottom: 50}} buttonText={buttonText} loading={loading}/>
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
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
