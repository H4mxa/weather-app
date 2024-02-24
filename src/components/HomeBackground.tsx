import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScaledSize,
  StyleSheet,
  View,
} from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";
import { useForecastSheetPosition } from "../context/ForecastSheetContext";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import BackgroundGradient from "./BackgroundGradient";

const HomeBackground = () => {
  const dimensions = useApplicationDimensions();
  const animatedPosition = useForecastSheetPosition();

  const { width, height } = dimensions;
  const myStyles = styles(dimensions);

  const smokeHeight = height * 0.6;
  const smokeOffsetY = height * 0.4;

  const lefBkgColor = useSharedValue("#2E335A");
  const rightBkgColor = useSharedValue("#1C1B33");

  const bkgColor = useDerivedValue(() => {
    if (Platform.OS === "ios") {
      lefBkgColor.value = interpolateColor(
        animatedPosition.value,
        [0, 1],
        ["#2E335A", "#422E5A"]
      );
    } else {
      lefBkgColor.value = animatedPosition.value > 0.5 ? "#422E5A" : "#2E335A";
    }

    return [lefBkgColor.value, rightBkgColor.value];
  });

  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

  const animatedImageBackgroundStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 0.04, 1],
            [0, 0.04, -height],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const animatedCanvasSmokeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,
        [0, 0.1],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <BackgroundGradient colors={bkgColor} />

      <AnimatedImageBackground
        source={require("../../assets/home/Background.png")}
        resizeMode="cover"
        style={[
          {
            height: "100%",
          },
          animatedImageBackgroundStyles,
        ]}
      >
        <AnimatedCanvas
          style={[
            {
              height: smokeHeight,
              ...StyleSheet.absoluteFillObject,
              top: smokeOffsetY,
            },
            animatedCanvasSmokeStyles,
          ]}
        >
          <Rect x={0} y={0} width={width} height={smokeHeight}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, smokeHeight)}
              colors={["rgba(58,63,84,0)", "rgba(58,63,84,1)"]}
              positions={[-0.02, 0.54]}
            />
          </Rect>
        </AnimatedCanvas>
        <Image
          source={require("../../assets/home/House.png")}
          style={myStyles.houseImage}
          resizeMode="cover"
        />
      </AnimatedImageBackground>
    </View>
  );
};

export default HomeBackground;

const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    houseImage: {
      width: width,
      height: width,
      ...StyleSheet.absoluteFillObject,
      top: "36%",
    },
  });
