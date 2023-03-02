import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native"
import LottieView from "lottie-react-native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { themeColors } from "../../config/themeColors"
import { RootStackParamList } from "../../navigation/Navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { styles } from "./styles"

type IntroNavProp = StackNavigationProp<RootStackParamList, "Intro">

type Props = {
  navigation: IntroNavProp
}

function Welcome({ navigation }: Props) {
  const { replace } = navigation
  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      <ImageBackground
        source={require("../../../assets/slider/image1.jpeg")}
        style={styles.background}
        resizeMode="cover"
        blurRadius={5}
      >
        <StatusBar backgroundColor={themeColors.googleGray} style="light" />
        <View style={styles.animationWrapper}>
          <LottieView
            speed={1}
            style={styles.animation}
            source={{
              uri: "https://assets6.lottiefiles.com/packages/lf20_svy4ivvy.json",
            }}
            autoPlay={true}
            loop={true}
          />
        </View>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: Dimensions.get("screen").width * 0.1,
          }}
        >
          UBER TOUR
        </Text>
        <Pressable
          style={styles.navigate}
          android_ripple={{
            color: themeColors.googleLightGray,
            radius: 30,
            borderless: true,
          }}
          onPress={() => replace("Intro")}
        >
          <Text style={styles.navigateText}>Get Started</Text>
        </Pressable>
      </ImageBackground>
    </View>
  )
}

export default Welcome
