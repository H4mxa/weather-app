import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundGradient from "../components/BackgroundGradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const WeatherList = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <>
      <BackgroundGradient />
      <View style={{ paddingTop: top + 2, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={() => navigation.navigate("home")}>
              <Ionicons
                name="chevron-back-sharp"
                size={34}
                color={"rgba(235,235,245,0.6)"}
              />
            </Pressable>
            <Text style={styles.titleText}>Weather</Text>
          </View>

          <View>
            <Ionicons
              name="ellipsis-horizontal-circle"
              size={34}
              color={"white"}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default WeatherList;

const styles = StyleSheet.create({
  titleText: {
    color: "white",
    fontFamily: "SF-Semibold",
    fontSize: 28,
    lineHeight: 34,
  },
});
