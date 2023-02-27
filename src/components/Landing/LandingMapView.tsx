import { StyleSheet, Text, View } from "react-native"
import React from "react"
import MapView, { Marker } from "react-native-maps"
import { themeColors } from "../../config/themeColors"

type Props = {
  mapRegion: any
}

export const LandingMapView = ({ mapRegion }: Props) => {
  return (
    <View>
      <MapView style={styles.map} region={mapRegion}>
        <Marker
          coordinate={mapRegion}
          title="You"
          description="Your current location"
          pinColor={themeColors.googleGreen}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "gray",
  },
})
