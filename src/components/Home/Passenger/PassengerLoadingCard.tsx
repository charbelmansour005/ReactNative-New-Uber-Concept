import { StyleSheet, View } from "react-native"
import React from "react"
import LottieView from "lottie-react-native"
import Skeleton from "../../../assets/137592-skeleton-loader-aspect-ratio-31.json"

const PassengerLoadingCard = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "1%",
      }}
    >
      <LottieView
        speed={1}
        style={{
          height: 100,
          width: "100%",
        }}
        source={Skeleton}
        autoPlay={true}
        loop={true}
      />
    </View>
  )
}

export default PassengerLoadingCard

const styles = StyleSheet.create({})
