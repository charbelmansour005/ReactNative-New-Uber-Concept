import React, { useState, useEffect, useCallback } from "react"
import { useToast } from "react-native-toast-notifications"
import { View, Text, SafeAreaView } from "react-native"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { themeColors } from "../../config/themeColors"
import { Ionicons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../navigation/Navigation"
import { styles } from "./styles"
import { Durations } from "../../helpers/durations"
import {
  LandingMapView,
  LandingSignInBTN,
  LandingSignUpBTN,
} from "../../components/index"
import OriginalLoader from "../../components/UI/OriginalLoader"

const initialRegion = {
  latitude: 33.8938,
  longitude: 35.5018,
  latitudeDelta: 14.01,
  longitudeDelta: 14.01,
}

type Region = typeof initialRegion

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "SignUp" | "Login"
>

type Props = {
  navigation: NavigationProps
}

type LandingState = {
  showChip: boolean
  viewHeight: string
  loading: boolean
  errorMsg: string | null
  mapRegion: Region
}

const initialLandingState: LandingState = {
  showChip: true,
  viewHeight: "89%",
  loading: false,
  errorMsg: null,
  mapRegion: initialRegion,
}

export default function Landing({ navigation }: Props) {
  const { replace } = navigation
  const [landingState, setLandingState] =
    useState<LandingState>(initialLandingState)

  const toast = useToast()

  const landingToast = () =>
    toast.show(
      "Use this map to find interesting locations and plan ahead a great adventure.\n\nPlease note in order to start your adventure, you must sign up/login.",
      {
        placement: "top",
        duration: Durations.LONG,
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
      setLandingState((prevState) => ({
        ...prevState,
        loading: true,
      }))
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setLandingState((prevState) => ({
          ...prevState,
          errorMsg: "Permission to access location was denied",
        }))
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLandingState((prevState) => ({
        ...prevState,
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
        loading: false,
      }))
    } catch (error) {
      console.log(error)
      setLandingState((prevState) => ({
        ...prevState,
        loading: false,
      }))
      toast.show("There was an error\nPlease try again", {
        placement: "center",
        type: "error",
      })
      // retry after 5 seconds
      setTimeout(fetchUserLocation, 5000)
    }
  }, [landingState.mapRegion])

  useEffect(() => {
    fetchUserLocation()
    landingToast()
  }, [])

  const wrapperStyles = [
    styles.mainWrapper,
    {
      borderTopColor: landingState.loading ? "orange" : themeColors.googleGreen,
    },
  ]

  const mapView = () => (
    <View
      style={
        landingState.loading
          ? { height: landingState.viewHeight, ...styles.blur }
          : { height: landingState.viewHeight, ...styles.normal }
      }
    >
      <LandingMapView mapRegion={landingState.mapRegion} />
    </View>
  )

  const loader = () => (
    <View style={styles.centerLoad}>
      <OriginalLoader />
    </View>
  )

  const footer = () => (
    <View style={wrapperStyles}>
      {landingState.errorMsg && <Text>{landingState.errorMsg}</Text>}
      <View style={styles.belowButtons}>
        <LandingSignUpBTN replace={replace} />
        <LandingSignInBTN replace={replace} />
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeColors.googleLightGray} style="dark" />

      {mapView()}

      <>{landingState.loading && loader()}</>

      {footer()}
    </SafeAreaView>
  )
}
