import React, { useCallback, useEffect, useState } from "react"
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native"
import * as Location from "expo-location"
import * as SecureStore from "expo-secure-store"
import { Card, Divider } from "react-native-paper"
import { useAppDispatch } from "../../redux/app/rtkHooks"
import { useToast } from "react-native-toast-notifications"
import { RefreshControl } from "react-native-gesture-handler"
import { themeColors } from "../../config/themeColors"
import { getNearPassengersAPI } from "../../services/getNearPassengersAPI"
import { fetchTours } from "../../redux/passenger/tour/tourSlice"
import { instance } from "../../services/api"
import { styles } from "./styles"
import {
  DriverCardData,
  DriverMapView,
  PassengerMapView,
} from "../../components/index"
import { Durations } from "../../helpers/durations"
import { finishTourAPI } from "../../services/finishTourAPI"
import { bookTourAPI } from "../../services/bookTourAPI"

const initialRegion = {
  latitude: 33.8938,
  longitude: 35.5018,
  latitudeDelta: 2.01,
  longitudeDelta: 2.01,
}

type Region = typeof initialRegion

type Item = {
  _id: string
  distanceInKiloMeter: number
  endTime: string
  startTime: string
}

type DriverState = {
  data: Item[]
  errorMsg: string | null
  fetchingLocation: boolean
  mapRegion: Region
  passengerName: string | null
  passengerNumber: number | null
  chosenTourID: string | null
  loadingNearPsngrs: boolean
  tourChosen: boolean
  destination: Region | null
}

const initialDriverState: DriverState = {
  data: [],
  errorMsg: null,
  fetchingLocation: false,
  mapRegion: initialRegion,
  passengerName: null,
  passengerNumber: null,
  chosenTourID: null,
  loadingNearPsngrs: false,
  tourChosen: false,
  destination: null,
}

const Driver = () => {
  const [driverState, setDriverState] =
    useState<DriverState>(initialDriverState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTours())
  }, [])

  const toast = useToast()

  // auto Send Location - both
  const autoSendLocation = async () => {
    setDriverState((prevState) => ({ ...prevState, fetchingLocation: true }))
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setDriverState((prevState) => ({
        ...prevState,
        errorMsg: "Permission to access location was denied",
      }))
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    setDriverState((prevState) => ({
      ...prevState,
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
    }))
    try {
      const latitude = location.coords.latitude
      const longitude = location.coords.longitude
      const body = {
        longitude: longitude,
        latitude: latitude,
      }
      await instance.post(`/auth/updatecoordinates`, body)
    } catch (error) {
      setDriverState((prevState) => ({ ...prevState, fetchingLocation: false }))
      console.log(error)
      toast.show("There was an error\nPlease try again", {
        placement: "center",
        type: "error",
      })
      setTimeout(autoSendLocation, 2000)
    }
    setDriverState((prevState) => ({ ...prevState, fetchingLocation: false }))
  }

  useEffect(() => {
    autoSendLocation()
  }, [])

  const getNearPassengers = async () => {
    try {
      setDriverState((prevState) => ({ ...prevState, loadingNearPsngrs: true }))
      const response: any = await getNearPassengersAPI()
      setDriverState((prevState) => ({
        ...prevState,
        data: response.data,
        loadingNearPsngrs: false,
      }))
    } catch (error) {
      console.log(error)
      setDriverState((prevState) => ({
        ...prevState,
        loadingNearPsngrs: false,
      }))
    }
  }

  const startTour = useCallback(
    async (id: string | any) => {
      try {
        const result = await bookTourAPI(id)
        setDriverState((prevState) => ({ ...prevState, chosenTourID: id }))
        toast.show(`Tour started\n\nPassenger location dropped on map.`, {
          textStyle: { fontWeight: "normal" },
          type: "normal",
          normalColor: "#3466b3",
        })
        const latitudeResp = result.coordinates?.latitude
        const longitudeResp = result.coordinates?.longitude
        const nameResp = result.passenger?.name
        const phoneResp = result.passenger?.phoneNumber

        setDriverState((prevState) => ({
          ...prevState,
          passengerName: nameResp,
          passengerNumber: phoneResp,
          destination: {
            latitude: latitudeResp,
            longitude: longitudeResp,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          tourChosen: true,
        }))

        // set tour chosen to true to use big map screen
        // remove taken passenger by refreshing list
        getNearPassengers()
      } catch (error) {
        console.log(error)
      }
    },
    [
      getNearPassengers,
      driverState.chosenTourID,
      driverState.destination,
      driverState.passengerName,
      driverState.passengerNumber,
    ]
  )

  // driver's available tours
  const renderDriverToursItem = ({
    item,
    index,
  }: {
    item: Item
    index: number
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

  const showDriverToast = () =>
    toast.show("Fetching near passengers", {
      placement: "top",
      style: { marginTop: 20 },
      duration: Durations.SHORT,
      normalColor: "#3466b3",
      textStyle: { fontWeight: "normal" },
    })

  const getShowName = async () => {
    const PersonName = await SecureStore.getItemAsync("PersonName")
    toast.show(`Welcome, ${PersonName}`, {
      placement: "bottom",
      style: { marginTop: 20 },
      duration: Durations.MEDIUM,
      normalColor: "#3466b3",
      textStyle: { fontWeight: "normal" },
    })
  }

  useEffect(() => {
    getShowName()
    showDriverToast()
    setTimeout(() => {
      getNearPassengers()
    }, 2000)
  }, [])

  const handleRefresh = () => {
    setDriverState((prevState) => ({ ...prevState, loadingNearPsngrs: false }))
    getNearPassengers()
  }

  const markTourAsComplete = useCallback(async () => {
    try {
      const { message } = await finishTourAPI(driverState.chosenTourID)
      setDriverState((prevState) => ({ ...prevState, tourChosen: false }))
      toast.show(message)
    } catch (error) {
      toast.show("there was a problem finish your tour.")
      console.log(error)
    }
  }, [driverState.chosenTourID])

  return (
    <View style={styles.container}>
      <View>
        {!driverState.tourChosen ? (
          <React.Fragment>
            <DriverMapView mapRegion={driverState.mapRegion} />
            <FlatList
              ListHeaderComponent={
                <React.Fragment>
                  {/* <SharedFlatListHeader /> */}
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
                  enabled={!driverState.loadingNearPsngrs}
                  refreshing={driverState.loadingNearPsngrs}
                  onRefresh={async () => {
                    handleRefresh()
                  }}
                  tintColor="black"
                />
              }
              ListFooterComponent={
                <View>
                  {driverState.data.length ? (
                    <View style={styles.listFooterWrapper}>
                      <Text style={styles.listFooterText}>
                        {driverState.loadingNearPsngrs
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
              data={driverState.data}
              renderItem={renderDriverToursItem}
              keyExtractor={(item) => item._id}
            />
            <>
              {driverState.fetchingLocation && (
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
              mapRegion={driverState.mapRegion}
              destination={driverState.destination}
              passengerName={driverState.passengerName}
              passengerNumber={driverState.passengerNumber}
            />
            {driverState.passengerName && driverState.passengerNumber && (
              <React.Fragment>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: themeColors.googleGray,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: 1,
                    height: "12%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 5,
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Passenger: {driverState.passengerName}
                  </Text>
                  <Divider />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      android_ripple={{ color: "white" }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 5,
                        backgroundColor: themeColors.googleGreen,
                        padding: 10,
                        borderRadius: 1,
                      }}
                      onPress={() =>
                        Linking.openURL(`tel:${driverState.passengerNumber}`)
                      }
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Call {driverState.passengerName}
                      </Text>
                    </Pressable>
                    <Pressable
                      android_ripple={{ color: "white" }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 5,
                        backgroundColor: themeColors.googleBlue,
                        padding: 10,
                        borderRadius: 1,
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
                        Finish Tour
                      </Text>
                    </Pressable>
                  </View>
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
