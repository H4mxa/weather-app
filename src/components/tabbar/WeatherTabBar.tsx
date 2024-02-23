import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import TabbarItems from "./elements/TabbarItems";
import { BlurView } from "expo-blur";
import { useForecastSheetPosition } from "../../context/ForecastSheetContext";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const WeatherTabBar = () => {
  const tabBarHeight = 88;
  const { width, height } = useApplicationDimensions();

  const animatedPosition = useForecastSheetPosition();

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, tabBarHeight + 20]
          ),
        },
      ],
    };
  });

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          top: height - tabBarHeight,
        },
        animatedViewStyle,
      ]}
    >
      <AnimatedBlurView
        intensity={50}
        tint="dark"
        style={[
          {
            height: tabBarHeight,
            ...StyleSheet.absoluteFillObject,
          },
          animatedViewStyle,
        ]}
        experimentalBlurMethod="dimezisBlurView"
      >
        <ArcComponent width={width} height={tabBarHeight} />
        <TabbarItems />
      </AnimatedBlurView>
    </Animated.View>
  );
};

export default WeatherTabBar;

const styles = StyleSheet.create({});
