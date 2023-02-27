import { StyleSheet, View } from "react-native"
import React from "react"
import MapView, { Marker } from "react-native-maps"
import { themeColors } from "../../../config/themeColors"

type Props = {
  mapRegion: any
  destination: any
  passengerName: string | null
  passengerNumber: number | null
}

const PassengerMapView = ({ ...props }: Props) => {
  return (
    <View>
      <MapView style={styles.mapPassenger} region={props.mapRegion}>
        <Marker
          coordinate={props.mapRegion}
          title="You"
          pinColor={themeColors.googleGreen}
          zIndex={1}
        />
        {props.destination && (
          <Marker
            coordinate={{
              latitude: props.destination.latitude,
              longitude: props.destination.longitude,
            }}
            title={
              props.passengerName && props.passengerNumber
                ? `${props.passengerName}`
                : "Destination"
            }
            description="Start location of the tour"
            zIndex={2}
          />
        )}
      </MapView>
    </View>
  )
}

export default PassengerMapView

const styles = StyleSheet.create({
  mapPassenger: {
    width: "100%",
    height: "100%",
  },
})
