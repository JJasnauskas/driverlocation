import { ActivityIndicator } from "react-native";
import Container from "./Container";
import React from "react";

const Spinner = () => (
  <Container>
    <ActivityIndicator size="small" color="#00ff00" />
  </Container>
);

export default Spinner;
