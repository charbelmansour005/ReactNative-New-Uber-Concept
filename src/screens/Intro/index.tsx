import React from "react"
import { View, Text, ImageBackground } from "react-native"
import AppIntroSlider from "react-native-app-intro-slider"
import { RootStackParamList } from "../../navigation/Navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { styles } from "./styles"

type NavigationProps = StackNavigationProp<RootStackParamList, "Landing">

type Props = {
  navigation: NavigationProps
}

interface Slide {
  key: string
  title: string
  text: string
  image: number
  backgroundColor: string
}

const slides: Slide[] = [
  {
    key: "one",
    title: "Explore the city with local guides",
    text: "Discover hidden gems and local hotspots with our network of knowledgeable drivers.",
    image: require("../../../assets/slider/image1.jpeg"),
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Create your own tour itinerary",
    text: "Choose your own adventure and customize your tour route to see the sights that interest you the most.",
    image: require("../../../assets/slider/image2.jpeg"),
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Safe and reliable transportation",
    text: "Sit back and relax as our vetted drivers take you on a personalized tour of the city, with the safety and comfort you can trust.",
    image: require("../../../assets/slider/image3.jpeg"),
    backgroundColor: "#22bcb5",
  },
]

const Intro = ({ navigation }: Props) => {
  const { replace } = navigation

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <ImageBackground
        source={require("../../../assets/slider/image2.jpeg")}
        style={styles.background}
        resizeMode="cover"
        blurRadius={10}
      >
        <View style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </ImageBackground>
    )
  }

  const onDone = () => {
    replace("Landing")
  }

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      bottomButton
      showDoneButton
      showNextButton
      showSkipButton
      renderDoneButton={() => <Text style={styles.navigateText}>Done</Text>}
      renderNextButton={() => <Text style={styles.navigateText}>Next</Text>}
      renderPrevButton={() => <Text style={styles.navigateText}>Prev</Text>}
      renderSkipButton={() => <Text style={styles.navigateTextSkip}>Skip</Text>}
    />
  )
}

export default Intro
