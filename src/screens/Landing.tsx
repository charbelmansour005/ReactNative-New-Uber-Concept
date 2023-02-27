import React, { useState, useEffect, useCallback } from "react"
import { useToast } from "react-native-toast-notifications"
import { StyleSheet, View, Text, SafeAreaView } from "react-native"
import LottieView from "lottie-react-native"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { themeColors } from "../config/themeColors"
import { Ionicons } from "@expo/vector-icons"
// components
import { LandingMapView } from "../components/Landing/LandingMapView"
import { LandingSignUpBTN } from "../components/Landing/LandingSignUpBTN"
import LandingSignInBTN from "../components/Landing/LandingSignInBTN"
import { Chip } from "react-native-paper"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../navigation/Navigation"

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "SignUp" | "Login"
>

type Props = {
  navigation: NavigationProps
}

export default function Landing({ navigation }: Props) {
  const { replace } = navigation
  const [showChip, setShowChip] = useState(true)
  const [viewHeight, setViewHeight] = useState("83%")
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<any>(null)
  const toast = useToast()
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 33.8938,
    longitude: 35.5018,
    latitudeDelta: 2.0922,
    longitudeDelta: 2.0421,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChip(false)
      setViewHeight("89%")
    }, 1500)
    return () => clearTimeout(timer)
  }, [loading])

  const landingToast = () =>
    toast.show(
      "Use this map to find interesting locations and plan ahead a great adventure.\n\nPlease note in order to start your adventure, you must sign up/login.",
      {
        placement: "top",
        duration: 5000,
        animationType: "slide-in",
        normalColor: themeColors.googleGray,
        type: "normal",
        style: { marginTop: 100, opacity: 0.8 },
        textStyle: {
          fontWeight: "300",
          color: "white",
        },
        icon: <Ionicons name="map" size={10} color={themeColors.googleGreen} />,
      }
    )

  const fetchUserLocation = useCallback(async () => {
    try {
      setLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.show("There was an error\nPlease try again", {
        placement: "center",
        type: "error",
      })
      // retry after 2 seconds
      setTimeout(fetchUserLocation, 2000)
    }
  }, [setMapRegion])

  useEffect(() => {
    fetchUserLocation()
    landingToast()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeColors.googleGray} style="light" />
      <View
        style={
          loading
            ? { height: viewHeight, ...styles.blur }
            : { height: viewHeight, ...styles.normal }
        }
      >
        <LandingMapView mapRegion={mapRegion} />
      </View>
      <>
        {loading && (
          <View style={styles.centerLoad}>
            <LottieView
              speed={5}
              style={{
                height: 50,
              }}
              source={{
                uri: "https://assets6.lottiefiles.com/packages/lf20_2tyhlsvz.json",
              }}
              autoPlay={true}
              loop={true}
            />
          </View>
        )}
      </>
      <View
        style={{
          borderColor: "#dbdbdb",
          ...styles.mainWrapper,
        }}
      >
        {showChip && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 0.5,
                backgroundColor: loading
                  ? themeColors.googleYellow
                  : themeColors.googleGreen,
                marginHorizontal: 1,
              }}
            />
            <Chip
              compact={true}
              elevated={true}
              mode={loading ? "flat" : "flat"}
              // elevation={4}
              textStyle={{
                color: loading
                  ? themeColors.googleYellow
                  : themeColors.googleGreen,
              }}
              style={{ backgroundColor: themeColors.googleGray }}
            >
              {loading ? "Locating You..." : "Location Found"}
            </Chip>
            <View
              style={{
                flex: 1,
                height: 0.5,
                backgroundColor: loading
                  ? themeColors.googleYellow
                  : themeColors.googleGreen,
                marginHorizontal: 1,
              }}
            />
          </View>
        )}
        {errorMsg && <Text>{errorMsg}</Text>}
        <View style={styles.belowButtons}>
          <LandingSignUpBTN replace={replace} />
          <LandingSignInBTN replace={replace} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centerLoad: {
    position: "absolute",
    left: 1,
    right: 1,
    top: 1,
    bottom: 0,
    marginTop: "70%",
  },
  belowButtons: {
    borderRadius: 5,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 1,
  },
  mainWrapper: {
    borderTopWidth: 3,
    marginTop: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    padding: 5,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: themeColors.googleGray,
  },
  normal: {
    opacity: 1,
    width: "100%",
  },
  blur: {
    opacity: 0.1,
    width: "100%",
  },
})
