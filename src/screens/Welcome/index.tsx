import { Text, View, ImageBackground, TouchableOpacity } from "react-native"
import LottieView from "lottie-react-native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { RootStackParamList } from "../../navigation/Navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { styles } from "./styles"
import { Chip } from "react-native-paper"

type IntroNavProp = StackNavigationProp<RootStackParamList, "Intro">

type Props = {
  navigation: IntroNavProp
}

interface WelcomeTexts {
  title: string
  subTitle: string
  start: string
}

function Welcome({ navigation }: Props): JSX.Element {
  const { replace } = navigation

  const WelcomeTexts: WelcomeTexts = {
    title: "UBER TOUR",
    subTitle: "Thank you for choosing us",
    start: "Get Started",
  }

  return (
    <View style={styles.mainWrapper}>
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

        <Text style={styles.welcomeTitle}>{WelcomeTexts.title}</Text>

        <View style={styles.chipWrapper}>
          <Chip mode="outlined" style={styles.chipStyle}>
            <Text style={styles.subTitle}>{WelcomeTexts.subTitle}</Text>
          </Chip>
        </View>

        <TouchableOpacity
          style={styles.navigate}
          onPress={() => replace("Intro")}
        >
          <Text style={styles.navigateText}>{WelcomeTexts.start}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Welcome
