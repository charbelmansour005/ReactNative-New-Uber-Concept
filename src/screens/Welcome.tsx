import { Pressable, StyleSheet, Text, View } from "react-native"
import LottieView from "lottie-react-native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { themeColors } from "../config/themeColors"
import { RootStackParamList } from "../navigation/Navigation"
import { StackNavigationProp } from "@react-navigation/stack"

type LandingNavProp = StackNavigationProp<RootStackParamList, "Landing">

type Props = {
  navigation: LandingNavProp
}

const Welcome = ({ navigation }: Props) => {
  return (
    <View style={styles.center}>
      <StatusBar backgroundColor={themeColors.googleGray} style="light" />
      <LottieView
        speed={1}
        style={styles.animation}
        source={{
          uri: "https://assets6.lottiefiles.com/packages/lf20_svy4ivvy.json",
        }}
        autoPlay={true}
        loop={true}
      />
      <Pressable
        style={styles.navigate}
        android_ripple={{
          color: themeColors.googleLightGray,
          radius: 30,
          borderless: true,
        }}
        onPress={() => navigation.navigate("Landing")}
      >
        <Text style={styles.navigateText}>Explore Uber Tour</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  navigateText: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  navigate: {
    backgroundColor: themeColors.googleGray,
    width: "93%",
    padding: 10,
    borderRadius: 3,
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
  },
  animation: {
    width: "100%",
    height: 350,
    aspectRatio: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
})

export default Welcome
