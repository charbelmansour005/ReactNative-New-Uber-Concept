import React, { useCallback, useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
} from "react-native"
import * as Location from "expo-location"
import { Card } from "react-native-paper"
import { useAppSelector, useAppDispatch } from "../redux/app/rtkHooks"
import * as SecureStore from "expo-secure-store"
import { setUser } from "../redux/login/loginSlice"
import { useToast } from "react-native-toast-notifications"
import { BASE_URL } from "../config/url"
import { Dimensions } from "react-native"
import { RefreshControl } from "react-native-gesture-handler"
import { themeColors } from "../config/themeColors"
import { getNearPassengersAPI } from "../services/getNearPassengersAPI"
import { fetchTours } from "../redux/passenger/tour/tourSlice"
// components
import DriverCardData from "../components/Home/Driver/DriverCardData"
import SharedFlatListHeader from "../components/Home/Shared/SharedFlatListHeader"
import DriverMapView from "../components/Home/Driver/DriverMapView"
import PassengerMapView from "../components/Home/Passenger/PassengerMapView"
import { instance } from "../services/api"

type Item = {
  _id: string
  distanceInKiloMeter: number
  endTime: string
  startTime: string
}

const Driver = () => {
  const [data, setData] = useState<Item[]>([])
  const user = useAppSelector((state) => state?.user)
  const dispatch = useAppDispatch()

  const [errorMsg, setErrorMsg] = useState<any>(null)
  const [fetchingLocation, setFetchingLocation] = useState<boolean>(false)
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 33.8938,
    longitude: 35.5018,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  const [passengerName, setPassengerName] = useState<string | null>("")
  const [passengerNumber, setPassengerNumber] = useState<number | null>(0)
  const [chosenTourID, setChosenTourID] = useState<string | null>("")
  const [loadingNearPsngrs, setLoadingNearPsngrs] = useState<boolean>(false)
  const [tourChosen, setTourChosen] = useState<boolean>(false)
  const [destination, setDestination] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchTours())
  }, [])

  const toast = useToast()

  // auto Send Location - both
  const autoSendLocation = useCallback(async () => {
    setFetchingLocation(true)
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
    try {
      const latitude = location.coords.latitude
      const longitude = location.coords.longitude
      const body = {
        longitude: longitude,
        latitude: latitude,
      }
      await instance.post(`/auth/updatecoordinates`, body)
    } catch (error) {
      setFetchingLocation(false)
      console.log(error)
      toast.show("There was an error\nPlease try again", {
        placement: "center",
        type: "error",
      })
      // retry after 2 seconds
      setTimeout(autoSendLocation, 2000)
    }
    setFetchingLocation(false)
  }, [setMapRegion])

  // both
  useEffect(() => {
    autoSendLocation()
  }, [])

  // both
  const onLogout = async () => {
    await SecureStore.setItemAsync("access_token", "")
    dispatch(setUser({ access_token: null, role: null }))
  }

  // both
  const askLogout = (): void =>
    Alert.alert(
      "Attention",
      "You are about to logout.\nClick away to cancel.",
      [
        {
          // no => passed : recieve cancel behavior
          style: "cancel",
        },
        {
          // logout
          text: "Confirm",
          onPress: (): void => {
            onLogout()
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  // driver get near passengers
  const getNearPassengers = async () => {
    try {
      setLoadingNearPsngrs(true)
      const response: any = await getNearPassengersAPI()
      setData(response.data)
      setLoadingNearPsngrs(false)
    } catch (error) {
      console.log(error)
      setLoadingNearPsngrs(false)
    }
  }

  const startTour = useCallback(
    async (id: string) => {
      try {
        const access_token = await SecureStore.getItemAsync("access_token")
        const response = await fetch(`${BASE_URL}/tour/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        setChosenTourID(id)
        const result = await response.json()
        toast.show(`Tour started\n\nPassenger location dropped on map.`, {
          textStyle: { fontWeight: "normal" },
          type: "normal",
          normalColor: "#3466b3",
        })
        const latitudeResp = result.coordinates?.latitude
        const longitudeResp = result.coordinates?.longitude
        const nameResp = result.passenger?.name
        const phoneResp = result.passenger?.phoneNumber
        setPassengerName(nameResp)
        setPassengerNumber(phoneResp)
        setDestination({
          latitude: latitudeResp,
          longitude: longitudeResp,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        })
        // set tour chosen to true to use big map screen
        setTourChosen(true)
        // remove taken passenger by refreshing list
        getNearPassengers()
      } catch (error) {
        console.log(error)
      }
    },
    [
      getNearPassengers,
      setChosenTourID,
      setDestination,
      setPassengerName,
      setPassengerNumber,
      setTourChosen,
      toast,
    ]
  )

  // driver's available tours
  const renderDriverToursItem = ({
    item,
    index,
  }: {
    item: Item
    index: any
  }) => (
    <View style={{ width: "100%" }}>
      <Card mode="elevated" elevation={3} style={styles.cardWrapper}>
        <DriverCardData
          index={index}
          distanceInKM={item.distanceInKiloMeter}
          startTime={item.startTime}
          endTime={item.endTime}
        />
        <Pressable
          android_ripple={{ color: "gray" }}
          style={styles.cardFindButton}
          onPress={() => startTour(item._id)}
        >
          <Text style={styles.cardFindText}>Start / Book tour</Text>
        </Pressable>
      </Card>
    </View>
  )
  // driver toast
  const showDriverToast = () =>
    toast.show("Fetching near passengers", {
      placement: "top",
      style: { marginTop: 20 },
      duration: 2000,
      normalColor: "#3466b3",
      textStyle: { fontWeight: "normal" },
    })
  // both
  const getShowName = async () => {
    const PersonName = await SecureStore.getItemAsync("PersonName")
    toast.show(`Welcome, ${PersonName}`, {
      placement: "bottom",
      style: { marginTop: 20 },
      duration: 4000,
      normalColor: "#3466b3",
      textStyle: { fontWeight: "normal" },
    })
  }

  // driver
  useEffect(() => {
    getShowName()
    if (user.user?.role === "driver") {
      showDriverToast()
      setTimeout(() => {
        getNearPassengers()
      }, 4000)
    }
  }, [])

  const handleRefresh = () => {
    setLoadingNearPsngrs(false)
    getNearPassengers()
  }

  const markTourAsComplete = useCallback(async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token")
      const response = await fetch(`${BASE_URL}/tour/${chosenTourID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      const result = await response.json()
      setTourChosen(false)
      console.log(result)
      toast.show(result.message)
    } catch (error) {
      console.log(error)
    }
  }, [chosenTourID, setTourChosen, toast])

  return (
    <View style={styles.container}>
      <View>
        {!tourChosen ? (
          <React.Fragment>
            <DriverMapView mapRegion={mapRegion} />
            <FlatList
              ListHeaderComponent={
                <React.Fragment>
                  <SharedFlatListHeader askLogout={askLogout} />
                </React.Fragment>
              }
              ListEmptyComponent={
                <View style={styles.listFooterWrapper}>
                  <Text style={styles.listFooterText}>
                    No Available Tours at this time.
                  </Text>
                </View>
              }
              refreshControl={
                <RefreshControl
                  enabled={!loadingNearPsngrs}
                  refreshing={loadingNearPsngrs}
                  onRefresh={async () => {
                    handleRefresh()
                  }}
                  tintColor="black"
                />
              }
              ListFooterComponent={
                <View>
                  {data.length ? (
                    <View style={styles.listFooterWrapper}>
                      <Text style={styles.listFooterText}>
                        {loadingNearPsngrs
                          ? "Loading near passengers"
                          : "End Reached"}
                      </Text>
                    </View>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </View>
              }
              contentContainerStyle={{
                flexGrow: 1,
              }}
              data={data}
              renderItem={renderDriverToursItem}
              keyExtractor={(item) => item._id}
            />
            <>
              {fetchingLocation && (
                <ActivityIndicator
                  size="large"
                  color="#3466b3"
                  style={{
                    position: "absolute",
                    left: 1,
                    right: 1,
                    top: 1,
                    marginTop: "25%",
                  }}
                />
              )}
            </>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <PassengerMapView
              mapRegion={mapRegion}
              destination={destination}
              passengerName={passengerName}
              passengerNumber={passengerNumber}
            />
            {passengerName && passengerNumber && (
              <React.Fragment>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "silver",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.8,
                    height: 100,
                  }}
                >
                  <Text
                    style={{
                      color: "#3466b3",
                      marginBottom: 5,
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 14,
                    }}
                  >
                    You're now touring {passengerName}
                  </Text>
                  <Pressable
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                      backgroundColor: themeColors.googleGreen,
                      padding: 5,
                      borderRadius: 3,
                    }}
                    onPress={() => Linking.openURL(`tel:${passengerNumber}`)}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Call {passengerName}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                      backgroundColor: themeColors.googleBlue,
                      padding: 5,
                      borderRadius: 3,
                    }}
                    onPress={markTourAsComplete}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Mark Tour as Complete
                    </Text>
                  </Pressable>
                </View>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </View>
    </View>
  )
}

export default Driver

const styles = StyleSheet.create({
  listFooterText: {
    color: themeColors.googleGray,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    backgroundColor: themeColors.googleLightGray,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
  },
  listFooterWrapper: {
    marginBottom: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.googleLightGray,
    marginTop: 20,
  },
  cardFindText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardFindButton: {
    backgroundColor: themeColors.googleBlue,
    paddingVertical: 8,
    width: "100%",
    borderRadius: 5,
    borderRightColor: "#dbdbdb",
    marginTop: 10,
  },
  cardWrapper: {
    marginHorizontal: 10,
    borderRadius: 2,
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  // styling of the map, % it takes from view
  normal: {
    opacity: 1,
    width: "100%",
    height: Dimensions.get("screen").height * 0.3,
  },
  blur: {
    opacity: 0.2,
    width: "100%",
    height: Dimensions.get("screen").height * 0.3,
  },
  container: {
    flex: 1,
    backgroundColor: "#dbdbdb",
  },
})
