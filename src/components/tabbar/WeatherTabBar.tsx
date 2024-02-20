import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import TabbarItems from "./elements/TabbarItems";

const WeatherTabBar = () => {
  const tabBarHeight = 88;
  const { width, height } = useApplicationDimensions();

  return (
    <View
      style={{
        height: tabBarHeight,
        ...StyleSheet.absoluteFillObject,
        top: height - tabBarHeight,
      }}
    >
      <ArcComponent width={width} height={tabBarHeight} />
      <TabbarItems />
    </View>
  );
};

export default WeatherTabBar;

const styles = StyleSheet.create({});
