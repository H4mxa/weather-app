import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Canvas, Line, LinearGradient, vec } from "@shopify/react-native-skia";
import { ForecastType } from "../../../models/Weather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useApplicationDimensions from "../../../hooks/useApplicationDimensions";

interface ForecastControlProps {
  onPress: (forecastType: ForecastType) => void;
}

const ForecastControl: React.FC<ForecastControlProps> = ({ onPress }) => {
  const [textWidth, setTextWidth] = useState(0);
  const { width } = useApplicationDimensions();

  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  const spacingX = 32;
  const strokeWidth = 3;

  const segmentTranslateX = useSharedValue(0);

  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
  const animatedSegmentLineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: segmentTranslateX.value,
        },
      ],
    };
  });

  const onForecastPress = (type: ForecastType) => {
    console.log("animatedSegmentLineStyle", segmentTranslateX.value);

    if (type === ForecastType.Weekly) {
      segmentTranslateX.value = withTiming(width - textWidth - spacingX * 3.5, {
        duration: 1000,
      });
    } else {
      segmentTranslateX.value = withTiming(0, { duration: 1000 });
    }
    onPress(type);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: spacingX,
        }}
      >
        <TouchableOpacity onPress={() => onForecastPress(ForecastType.Hourly)}>
          <Text onLayout={onTextLayout} style={styles.forecastText}>
            Hourly Forecast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onForecastPress(ForecastType.Weekly)}>
          <Text style={styles.forecastText}>Weekly Forecast</Text>
        </TouchableOpacity>
      </View>

      <AnimatedCanvas
        style={[
          {
            width: textWidth,
            height: strokeWidth,
            marginLeft: spacingX * 1.8,
          },
          animatedSegmentLineStyle,
        ]}
      >
        <Line p1={vec(0, 0)} p2={vec(textWidth, 0)} strokeWidth={5}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(textWidth, 0)}
            colors={[
              "rgba(147,112,177,0)",
              "rgba(147,112,177,1)",
              "rgba(147,112,177,0)",
            ]}
          />
        </Line>
      </AnimatedCanvas>
    </>
  );
};

export default ForecastControl;

const styles = StyleSheet.create({
  forecastText: {
    fontFamily: "SF-Semibold",
    fontSize: 15,
    lineHeight: 20,
    color: "rgba(235,235,245,0.6)",
  },
});
