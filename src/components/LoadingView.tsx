import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import BackgroundGradient from "./BackgroundGradient";

const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BackgroundGradient />
      <ActivityIndicator size={"large"} color={"rgba(235,235,246,0.6)"} />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({});
