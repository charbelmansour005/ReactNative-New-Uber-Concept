import React, { useCallback, useEffect, useState } from "react"
import MapView, { Marker } from "react-native-maps"
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native"
import * as Location from "expo-location"
import { IconButton } from "react-native-paper"
import { useAppDispatch } from "../redux/app/rtkHooks"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useToast } from "react-native-toast-notifications"
import { Dimensions } from "react-native"
import { themeColors } from "../config/themeColors"
import { startTourAPI } from "../services/startTourAPI"
import { fetchTours } from "../redux/passenger/tour/tourSlice"
// components
import PassengerFlatlist from "../components/Home/Passenger/PassengerFlatlist"
import { instance } from "../services/api"

type Props = {}

const Passenger = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const toast = useToast()
  const [fetchingLocation, setFetchingLocation] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<any>(null)
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 33.8938,
    longitude: 35.5018,
    latitudeDelta: 2.01,
    longitudeDelta: 2.01,
  })
  const [date, setDate] = useState(new Date())
  const [startDatemode, setStartDateMode] = useState<any>("date")
  const [showStartDate, setShowStartDate] = useState(false)
  const [startText, setStartText] = useState("")
  const [startTextUI, setStartTextUI] = useState("")
  const [dateEnd, setDateEnd] = useState(new Date())
  const [endDatemode, setEndDateMode] = useState<any>("time")
  const [showEndDate, setShowEndDate] = useState(false)
  const [endText, setEndText] = useState("")
  const [endTextUI, setEndTextUI] = useState("")
  const dispatch = useAppDispatch()

  const onChangeStartDateTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShowStartDate(Platform.OS === "ios")
    if (event.type == "set") {
      //ok button

      setDate(currentDate)
    } else {
      //cancel Button
      return null
    }
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    // to backend
    setStartText(tempDate.toISOString())
    // to UI
    const formattedDate = tempDate.toLocaleDateString()
    const formattedTime = tempDate.toLocaleTimeString()
    const [hours, minutes] = formattedTime.split(":").slice(0, 2)
    setStartTextUI(`${formattedDate} ${hours}:${minutes}`)
  }

  const onChangeEndTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShowEndDate(Platform.OS === "ios")
    if (event.type == "set") {
      //ok button

      setDate(currentDate)
    } else {
      //cancel Button
      return null
    }
    setDateEnd(currentDate)
    let tempDate = new Date(currentDate)
    // to backend
    setEndText(tempDate.toISOString().split("T")[1])
    // to UI
    const formattedTime = tempDate.toLocaleTimeString()
    const [hours, minutes] = formattedTime.split(":").slice(0, 2)
    setEndTextUI(`${hours}:${minutes}`)
  }

  const minDate = new Date() // current date and time
  const maxDate = new Date("2023-12-31T23:59:00")

  const showModeStart = (currentMode: any) => {
    setShowStartDate(true)
    setStartDateMode(currentMode)
  }
  const showModeEnd = (currentMode: any) => {
    setShowEndDate(true)
    setEndDateMode(currentMode)
  }

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

  const startTourHandler = async () => {
    // backend
    setStartText(``)
    setEndText(``)
    // frontend
    setStartTextUI(``)
    setEndTextUI(``)
    setModalVisible(false)
    if (startText === `` || endText === ``) {
      alert("Please enter a start date and an end time.")
      return
    }
    try {
      const { data }: any = await startTourAPI(startText, endText)
      toast.show(`${data?.message}\nA Driver will contact you soon`, {
        placement: "center",
        duration: 2000,
        type: "normal",
      })
      dispatch(fetchTours())
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <React.Fragment>
      <View>
        <View style={fetchingLocation ? styles.blur : styles.normal}>
          <MapView style={styles.mapPassenger} region={mapRegion}>
            <Marker coordinate={mapRegion} />
          </MapView>
          <>
            {fetchingLocation && (
              <React.Fragment>
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={{
                    position: "absolute",
                    left: 1,
                    right: 1,
                    top: 1,
                    bottom: 1,
                  }}
                />
                <Text
                  style={{
                    position: "absolute",
                    left: 1,
                    right: 1,
                    top: 1,
                    bottom: 1,
                    textAlign: "center",
                    color: "white",
                    marginTop: 20,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Loading location, please wait...
                </Text>
              </React.Fragment>
            )}
          </>
        </View>
        <View
          style={{
            borderTopColor: "white",
            borderTopWidth: 3,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {errorMsg && <Text>{errorMsg}</Text>}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
            }}
          >
            <Pressable
              android_ripple={{ color: "gray" }}
              style={{
                backgroundColor: themeColors.googleBlue,
                paddingVertical: 5,
                width: "100%",
                borderRadius: 0,
              }}
              onPress={() => setModalVisible(true)}
              disabled={fetchingLocation}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                Start a tour
              </Text>
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false)
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* date start  */}
              <Pressable
                android_ripple={{ color: "gray" }}
                style={styles.CalendatButtons}
                onPress={() => showModeStart("date")}
              >
                <Text style={styles.CalendarButtonsText}>Pick start day</Text>
              </Pressable>
              <Pressable
                android_ripple={{ color: "gray" }}
                style={styles.CalendatButtons}
                onPress={() => showModeStart("time")}
              >
                <Text style={styles.CalendarButtonsText}>Pick start time</Text>
              </Pressable>
              {showStartDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={startDatemode}
                  is24Hour={true}
                  minimumDate={minDate}
                  maximumDate={maxDate}
                  minuteInterval={30}
                  display="default"
                  onChange={onChangeStartDateTime}
                />
              )}
              <Pressable
                android_ripple={{ color: "gray" }}
                style={styles.CalendatButtons}
                onPress={() => showModeEnd("time")}
              >
                <Text style={styles.CalendarButtonsText}>Pick end time</Text>
              </Pressable>
              {showEndDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateEnd}
                  mode={endDatemode}
                  is24Hour={true}
                  display="default"
                  minuteInterval={30}
                  onChange={onChangeEndTime}
                />
              )}
              {startText && (
                <>
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      marginHorizontal: 3,
                      backgroundColor: "gray",
                      marginVertical: 2,
                      borderRadius: 3,
                    }}
                  />
                  <View style={styles.ChosenData}>
                    <Text
                      onPress={() => {
                        setStartText("")
                        setStartTextUI("")
                      }}
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Tour starts on {startTextUI}
                    </Text>
                  </View>
                </>
              )}
              {endText && (
                <View style={styles.ChosenData}>
                  <Text
                    onPress={() => {
                      setEndText("")
                      setEndTextUI("")
                    }}
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Tour ends at {endTextUI}
                  </Text>
                </View>
              )}
              {/* date end */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  containerColor="white"
                  icon="close"
                  iconColor={themeColors.googleRed}
                  style={{
                    marginVertical: 10,
                    marginHorizontal: "25%",
                  }}
                  size={20}
                  onPress={() => {
                    setStartText(``)
                    setEndText(``)
                    setStartTextUI(``)
                    setEndTextUI(``)
                    setModalVisible(false)
                  }}
                />
                <IconButton
                  disabled={!startText || !endText}
                  containerColor="white"
                  icon="check"
                  iconColor={themeColors.googleGreen}
                  style={{
                    marginVertical: 10,
                    marginHorizontal: "25%",
                  }}
                  size={20}
                  onPress={startTourHandler}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* passenger flatlist  */}
        <PassengerFlatlist />
      </View>
    </React.Fragment>
  )
}

export default Passenger

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
  ChosenData: {
    backgroundColor: themeColors.googleGreen,
    padding: 10,
    borderRadius: 0,
    width: "100%",
    marginVertical: 2,
  },
  CalendarButtonsText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
  CalendatButtons: {
    backgroundColor: themeColors.googleBlue,
    paddingVertical: 5,
    width: "100%",
    borderRadius: 0,
    marginVertical: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#dbdbdb",
  },
  mapPassenger: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 0,
    height: "100%",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
})
