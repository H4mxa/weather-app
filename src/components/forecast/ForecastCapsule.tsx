import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Forecast, ForecastType } from "../../models/Weather";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { DEGREE_SYMBOL } from "../../utils/constants";
import { converDateTo12HrFormat, getDayOfWeek } from "../../utils/DateHelper";

interface ForecastCapsuleProps {
  forecast: Forecast;
  width: number;
  height: number;
  radius: number;
}

const ForecastCapsule: React.FC<ForecastCapsuleProps> = ({
  forecast,
  width,
  height,
  radius,
}) => {
  const { date, icon, probability, temperature, type } = forecast;

  const timeDateOpacityDisplay = (): [string, number] => {
    let opacity = 0;
    let timeOrDay = "";

    if (type === ForecastType.Hourly) {
      timeOrDay = converDateTo12HrFormat(date);
      opacity = timeOrDay.toLowerCase() === "now" ? 1 : 0.2;
    } else {
      const [dayOfWeek, isToday] = getDayOfWeek(date);
      timeOrDay = dayOfWeek;
      opacity = isToday ? 1 : 0.2;
    }
    return [timeOrDay, opacity];
  };

  const [timeToDisplay, capsuleOpacity] = timeDateOpacityDisplay();

  const probabilityOpacity = probability > 0 ? 1 : 0;

  return (
    <View style={{ width, height }}>
      <Canvas style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={radius}
          color={`rgba(72,49,157,${capsuleOpacity})`}
        >
          <Shadow dx={5} dy={5} color={"rgba(0,0,0,0.25)"} blur={5} inner />
        </RoundedRect>
      </Canvas>

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <Text style={styles.time}>{timeToDisplay}</Text>
        <View>
          <Image
            source={icon}
            style={{ width: width / 2, height: width / 2 }}
          />

          <Text style={[styles.probability, { opacity: probabilityOpacity }]}>
            {probability}%
          </Text>
        </View>

        <Text style={styles.temperature}>
          {temperature}
          {DEGREE_SYMBOL}
        </Text>
      </View>
    </View>
  );
};

export default ForecastCapsule;

const styles = StyleSheet.create({
  time: {
    fontFamily: "SF-Semibold",
    fontSize: 15,
    lineHeight: 20,
    color: "white",
    letterSpacing: -0.5,
  },
  probability: {
    fontFamily: "SF-Semibold",
    fontSize: 13,
    lineHeight: 18,
    color: "#40CBD8",
    textAlign: "center",
  },
  temperature: {
    fontFamily: "SF-Regular",
    fontSize: 20,
    lineHeight: 24,
    color: "white",
    letterSpacing: 0.38,
  },
});
