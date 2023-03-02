import React, { useEffect, useLayoutEffect, useState } from "react"
import MapView, { Marker } from "react-native-maps"
import {
  Modal,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native"
import * as Location from "expo-location"
import { IconButton } from "react-native-paper"
import { useAppDispatch } from "../../redux/app/rtkHooks"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useToast } from "react-native-toast-notifications"
import { themeColors } from "../../config/themeColors"
import { startTourAPI } from "../../services/startTourAPI"
import { fetchTours } from "../../redux/passenger/tour/tourSlice"
import { styles } from "./styles"
import { PassengerFlatlist } from "../../components"
import { instance } from "../../services/api"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { Durations } from "../../helpers/durations"
import { googleColors } from "../../helpers/googleSpinner"

const initialRegion = {
  latitude: 33.8938,
  longitude: 35.5018,
  latitudeDelta: 2.01,
  longitudeDelta: 2.01,
}

type Region = typeof initialRegion

interface PassengerState {
  modalVisible: boolean
  fetchingLocation: boolean
  errorMsg: string | null
  mapRegion: Region
  date: Date
  startDatemode: any
  showStartDate: boolean
  startText: string | null
  startTextUI: string | null
  dateEnd: Date
  endDatemode: any
  showEndDate: boolean
  endText: string | null
  endTextUI: string | null
  mapVisible: boolean
}

const initialPassengerState: PassengerState = {
  modalVisible: false,
  fetchingLocation: false,
  errorMsg: null,
  mapRegion: initialRegion,
  date: new Date(),
  startDatemode: "date",
  showStartDate: false,
  startText: null,
  startTextUI: null,
  dateEnd: new Date(),
  endDatemode: "time",
  showEndDate: false,
  endText: null,
  endTextUI: null,
  mapVisible: true,
}
type HeaderRightProps = {
  onPressAdd: () => void
  onPressMap: () => void
  onPressSendLocation: () => void
  mapVisible: boolean
}

const HeaderRight: React.FC<HeaderRightProps> = ({
  onPressAdd,
  onPressMap,
  onPressSendLocation,
  mapVisible,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mapVisible && (
        <TouchableOpacity onPress={onPressSendLocation}>
          <Feather
            name="arrow-up-circle"
            size={23}
            color={themeColors.googleBlue}
            style={{
              marginRight: "10%",
            }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onPressMap}>
        <Feather
          name="map"
          size={23}
          color={themeColors.googleBlue}
          style={{
            marginRight: "10%",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd}>
        <Feather
          name="plus"
          selectable={false}
          size={23}
          color={themeColors.googleBlue}
          style={{
            marginRight: "5%",
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const Passenger = () => {
  const navigation = useNavigation()
  const toast = useToast()
  const [passengerState, setPassengerState] = useState<PassengerState>(
    initialPassengerState
  )
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: themeColors.googleGray,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <HeaderRight
          onPressAdd={() =>
            setPassengerState((prevState) => ({
              ...prevState,
              modalVisible: true,
            }))
          }
          onPressMap={() =>
            setPassengerState((prevState) => ({
              ...prevState,
              mapVisible: !prevState.mapVisible,
            }))
          }
          onPressSendLocation={autoSendLocation}
          mapVisible={passengerState?.mapVisible}
        />
      ),
    })
  }, [navigation, passengerState?.mapVisible])

  const onChangeStartDateTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || passengerState.date
    setPassengerState((prevState) => ({
      ...prevState,
      showStartDate: Platform.OS === "ios",
    }))
    if (event.type == "set") {
      //ok button
      setPassengerState((prevState) => ({ ...prevState, date: currentDate }))
    } else {
      //cancel Button
      return null
    }
    setPassengerState((prevState) => {
      let tempDate = new Date(currentDate)
      // to backend
      const startText = tempDate.toISOString()
      // to UI
      const formattedDate = tempDate.toLocaleDateString()
      const formattedTime = tempDate.toLocaleTimeString()
      const [hours, minutes] = formattedTime.split(":").slice(0, 2)
      return {
        ...prevState,
        startText,
        startTextUI: `${formattedDate} ${hours}:${minutes}`,
      }
    })
  }

  const onChangeEndTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || passengerState.date
    setPassengerState((prevState) => ({
      ...prevState,
      showEndDate: Platform.OS === "ios",
    }))
    if (event.type == "set") {
      //ok button

      setPassengerState((prevState) => ({ ...prevState, date: currentDate }))
    } else {
      //cancel Button
      return null
    }
    setPassengerState((prevState) => ({ ...prevState, dateEnd: currentDate }))
    let tempDate = new Date(currentDate)
    // to backend
    setPassengerState((prevState) => ({
      ...prevState,
      endText: tempDate.toISOString().split("T")[1],
    }))
    // to UI
    const formattedTime = tempDate.toLocaleTimeString()
    const [hours, minutes] = formattedTime.split(":").slice(0, 2)
    setPassengerState((prevState) => ({
      ...prevState,
      endTextUI: `${hours}:${minutes}`,
    }))
  }

  const minDate = new Date() // current date and time
  const maxDate = new Date("2023-12-31T23:59:00")

  const showModeStart = (currentMode: any) => {
    setPassengerState((prevState) => ({
      ...prevState,
      showStartDate: true,
      startDatemode: currentMode,
    }))
  }
  const showModeEnd = (currentMode: any) => {
    setPassengerState((prevState) => ({
      ...prevState,
      showEndDate: true,
      endDatemode: currentMode,
    }))
  }

  // auto Send Location - both
  const autoSendLocation = async () => {
    setPassengerState((prevState) => ({ ...prevState, fetchingLocation: true }))
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setPassengerState((prevState) => ({
        ...prevState,
        errorMsg: "Permission to access location was denied",
      }))
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    setPassengerState((prevState) => ({
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
      setPassengerState((prevState) => ({
        ...prevState,
        fetchingLocation: false,
      }))
      console.log(error)
      toast.show(
        "There was an error locating you\nTrying again in 10 seconds",
        {
          placement: "center",
          type: "error",
        }
      )
      // retry after 2 seconds
      setTimeout(autoSendLocation, 10000)
    }
    setPassengerState((prevState) => ({
      ...prevState,
      fetchingLocation: false,
    }))
  }

  // both
  useEffect(() => {
    dispatch(fetchTours())
    autoSendLocation()
  }, [])

  const startTourHandler = async () => {
    // backend
    setPassengerState((prevState) => ({
      ...prevState,
      startText: "",
      endText: "",
      startTextUI: "",
      endTextUI: "",
      modalVisible: false,
    }))
    if (passengerState.startText === `` || passengerState.endText === ``) {
      alert("Please enter a start date and an end time.")
      return
    }
    try {
      const { data }: any = await startTourAPI(
        passengerState.startText,
        passengerState.endText
      )
      toast.show(`${data?.message}\nA Driver will contact you soon`, {
        placement: "center",
        duration: Durations.SHORT,
        type: "normal",
      })
      dispatch(fetchTours())
    } catch (error: any) {
      alert(error.message)
    }
  }

  const randomSpinnerColor = googleColors[Math.floor(Math.random() * 10)]
  const chosenSpinnerColor: string = randomSpinnerColor

  return (
    <React.Fragment>
      <StatusBar backgroundColor="white" style="dark" />
      <View>
        {passengerState.mapVisible && (
          <View
            style={
              passengerState.fetchingLocation ? styles.blur : styles.normal
            }
          >
            <MapView
              style={styles.mapPassenger}
              region={passengerState.mapRegion}
            >
              <Marker coordinate={passengerState.mapRegion} />
            </MapView>
            <>
              {passengerState.fetchingLocation && (
                <React.Fragment>
                  <ActivityIndicator
                    size="large"
                    color={chosenSpinnerColor}
                    style={{
                      position: "absolute",
                      left: 1,
                      right: 1,
                      top: 1,
                      bottom: 1,
                    }}
                  />
                </React.Fragment>
              )}
            </>
          </View>
        )}
        <View
          style={{
            borderTopColor: "white",
            borderTopWidth: 3,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {passengerState.errorMsg && <Text>{passengerState.errorMsg}</Text>}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={passengerState.modalVisible}
          onRequestClose={() => {
            setPassengerState((prevState) => ({
              ...prevState,
              modalVisible: false,
            }))
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
              {passengerState.showStartDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={passengerState.date}
                  mode={passengerState.startDatemode}
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
              {passengerState.showEndDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={passengerState.dateEnd}
                  mode={passengerState.endDatemode}
                  is24Hour={true}
                  display="default"
                  minuteInterval={30}
                  onChange={onChangeEndTime}
                />
              )}
              {passengerState.startText && (
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
                        setPassengerState((prevState) => ({
                          ...prevState,
                          startText: "",
                          startTextUI: "",
                        }))
                      }}
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Tour starts on {passengerState.startTextUI}
                    </Text>
                  </View>
                </>
              )}
              {passengerState.endText && (
                <View style={styles.ChosenData}>
                  <Text
                    onPress={() => {
                      setPassengerState((prevState) => ({
                        ...prevState,
                        endText: "",
                        endTextUI: "",
                      }))
                    }}
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Tour ends at {passengerState.endTextUI}
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
                    setPassengerState((prevState) => ({
                      ...prevState,
                      startText: "",
                      endText: "",
                      startTextUI: "",
                      endTextUI: "",
                      modalVisible: false,
                    }))
                  }}
                />
                <IconButton
                  disabled={
                    !passengerState.startText || !passengerState.endText
                  }
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
