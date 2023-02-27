import { Dimensions, StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { themeColors } from "../../../config/themeColors"

type Props = {
  mapRegion: any
}

const DriverMapView = ({ mapRegion }: Props) => {
  return (
    <View style={styles.normalDriver}>
      <MapView style={styles.mapDriver} region={mapRegion}>
        <Marker
          coordinate={mapRegion}
          pinColor={themeColors.googleGreen}
          title="You"
          description="Your current location"
        />
      </MapView>
    </View>
  )
}

export default DriverMapView

const styles = StyleSheet.create({
  normalDriver: {
    opacity: 1,
    width: "100%",
    height: Dimensions.get("screen").height * 0.25,
  },
  mapDriver: {
    width: "100%",
    height: "100%",
  },
})
