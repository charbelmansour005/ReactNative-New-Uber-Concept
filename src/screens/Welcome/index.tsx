import { Text, View, TouchableOpacity, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { RootStackParamList } from "../../navigation/Navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { styles } from "./styles"
import { Chip } from "react-native-paper"
import Images from "../../assets/index"
import { LinearGradient } from "expo-linear-gradient"

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
    subTitle: "Your best guide",
    start: "Get Started",
  }

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "orange"]}
      style={{ width: "100%", height: "100%" }}
    >
      <StatusBar backgroundColor="transparent" style="light" />

      <View style={styles.background}>
        <View style={styles.animationWrapper}>
          <Image source={Images.logo} style={styles.animation} />
        </View>

        <Text style={styles.welcomeTitle}>{WelcomeTexts.title}</Text>

        <View style={styles.chipWrapper}>
          <Chip mode="flat" style={styles.chipStyle}>
            <Text style={styles.subTitle}>{WelcomeTexts.subTitle}</Text>
          </Chip>
        </View>

        <TouchableOpacity
          style={styles.navigate}
          onPress={() => replace("Intro")}
        >
          <Text style={styles.navigateText}>{WelcomeTexts.start}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default Welcome
