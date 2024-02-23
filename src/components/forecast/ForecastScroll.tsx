import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Forecast } from "../../models/Weather";
import { ScrollView } from "react-native-gesture-handler";
import ForecastCapsule from "./ForecastCapsule";

interface ForecastScrollProps {
  forecasts: Forecast[];
  capsuleWidth: number;
  capsuleHeight: number;
  capsuleRadius: number;
}

const ForecastScroll: React.FC<ForecastScrollProps> = ({
  forecasts,
  capsuleHeight,
  capsuleWidth,
  capsuleRadius,
}) => {
  return (
    <ScrollView
      horizontal
      style={{
        paddingLeft: 20,
        paddingTop: 20,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 12 }}>
        {forecasts.map((forecast, idx) => (
          <ForecastCapsule
            key={idx}
            width={capsuleWidth}
            height={capsuleHeight}
            radius={capsuleRadius}
            forecast={forecast}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ForecastScroll;

const styles = StyleSheet.create({});
