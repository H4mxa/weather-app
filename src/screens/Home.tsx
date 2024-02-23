import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeBackground from "../components/HomeBackground";
import WeatherInfo from "../components/section/WeatherInfo";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";
import { currentWeather } from "../data/CurrentWeather";
import { ForecastSheetProvier } from "../context/ForecastSheetContext";

const Home = () => {
  return (
    <ForecastSheetProvier>
      <HomeBackground />
      <WeatherInfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvier>
  );
};

export default Home;

const styles = StyleSheet.create({});
