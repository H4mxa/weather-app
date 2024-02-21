import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import TabbarItems from "./elements/TabbarItems";
import { BlurView } from "expo-blur";

const WeatherTabBar = () => {
  const tabBarHeight = 88;
  const { width, height } = useApplicationDimensions();

  return (
    <BlurView
      intensity={50}
      tint="dark"
      style={{
        height: tabBarHeight,
        ...StyleSheet.absoluteFillObject,
        top: height - tabBarHeight,
      }}
      experimentalBlurMethod="dimezisBlurView"
    >
      <ArcComponent width={width} height={tabBarHeight} />
      <TabbarItems />
    </BlurView>
  );
};

export default WeatherTabBar;

const styles = StyleSheet.create({});
