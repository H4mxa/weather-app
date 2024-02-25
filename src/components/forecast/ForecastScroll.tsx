import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Forecast } from '../../models/Weather'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ForecastCapsule from './ForecastCapsule'

interface ForecastScrollProps {
  forecasts: Forecast[]
  capsuleWidth: number
  capsuleHeight: number
  capsuleRadius: number
}

const ForecastScroll: React.FC<ForecastScrollProps> = ({
  forecasts,
  capsuleHeight,
  capsuleWidth,
  capsuleRadius,
}) => {
  return (
    <FlatList
      horizontal
      data={forecasts}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ForecastCapsule
          width={capsuleWidth}
          height={capsuleHeight}
          radius={capsuleRadius}
          forecast={item}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        flexDirection: 'row',
        gap: 12,
      }}
    />
  )
}

export default ForecastScroll

const styles = StyleSheet.create({})
