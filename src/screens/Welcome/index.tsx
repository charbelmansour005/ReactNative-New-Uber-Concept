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
import { Chip, Divider } from "react-native-paper"

type IntroNavProp = StackNavigationProp<RootStackParamList, "Intro">

type Props = {
  navigation: IntroNavProp
}

function Welcome({ navigation }: Props) {
  const { replace } = navigation
  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      <StatusBar backgroundColor="transparent" style="light" />
      <ImageBackground
        source={require("../../../assets/slider/image3.jpeg")}
        style={styles.background}
        resizeMode="cover"
        blurRadius={9}
      >
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
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30%",
          }}
        >
          <Chip
            mode="outlined"
            style={{
              backgroundColor: "transparent",
              height: 35,
              borderColor: "white",
              borderWidth: 0.5,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              Thank you for choosing us
            </Text>
          </Chip>
        </View>
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
