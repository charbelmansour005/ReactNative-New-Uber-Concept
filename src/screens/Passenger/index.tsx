import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
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
import { Divider, IconButton } from "react-native-paper"
import { useAppDispatch } from "../../redux/app/rtkHooks"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useToast } from "react-native-toast-notifications"
import { themeColors } from "../../config/themeColors"
import { startTourAPI } from "../../services/startTourAPI"
import { fetchTours } from "../../redux/passenger/tour/tourSlice"
import { styles } from "./styles"
import {
  PassengerFlatlist,
  PassengerMapInfoModalContent,
  PassengerTourStartText,
  PassengerTourEndText,
} from "../../components"
import { instance } from "../../services/api"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { Durations } from "../../helpers/durations"
import { chosenSpinnerColor } from "../../helpers/googleSpinner"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { RootStackParamList } from "../../navigation/Navigation"

const isAndroid = Platform.OS === "android"

type MyScreenNavigationProp = DrawerNavigationProp<RootStackParamList>

interface MyScreenProps {
  navigation: MyScreenNavigationProp
}

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
  mapOptionModalVisible: boolean
  username: string
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
  mapVisible: false,
  mapOptionModalVisible: false,
  username: "",
}

type HeaderRightProps = {
  onPressAdd: () => void
  onPressMap: () => void
  onLongPressMap: () => void
  onPressSendLocation: () => void
  mapVisible: boolean
}

const HeaderRight = ({
  onPressAdd,
  onPressMap,
  onLongPressMap,
  onPressSendLocation,
  mapVisible,
}: HeaderRightProps) => {
  return (
    <View style={styles.headerRightWrapper}>
      {mapVisible && (
        <TouchableOpacity onPress={onPressSendLocation}>
          <Feather
            name="map-pin"
            size={23}
            color={themeColors.googleBlue}
            style={{
              marginRight: "10%",
            }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onPressMap} onLongPress={onLongPressMap}>
        <Feather
          name={mapVisible ? "minimize-2" : "maximize-2"}
          size={23}
          color={mapVisible ? "orange" : themeColors.googleBlue}
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

function Passenger({ navigation }: MyScreenProps): JSX.Element {
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
      headerTintColor: themeColors.googleBlue,
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 14,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Feather name="menu" size={25} color={themeColors.googleGray} />
        </TouchableOpacity>
      ),
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
          onLongPressMap={() =>
            setPassengerState((prevState) => ({
              ...prevState,
              mapOptionModalVisible: true,
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

  const onChangeEndTime = (event: any, selectedDate: any): null | undefined => {
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

  const minDate = new Date()
  const maxDate = new Date("2023-12-31T23:59:00")

  const showModeStart = (currentMode: any): void => {
    setPassengerState((prevState) => ({
      ...prevState,
      showStartDate: true,
      startDatemode: currentMode,
    }))
  }
  const showModeEnd = (currentMode: any): void => {
    setPassengerState((prevState) => ({
      ...prevState,
      showEndDate: true,
      endDatemode: currentMode,
    }))
  }

  const autoSendLocation = async (): Promise<void> => {
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
      setTimeout(autoSendLocation, 10000) // auto retry after 10 seconds!
    }
    setPassengerState((prevState) => ({
      ...prevState,
      fetchingLocation: false,
    }))
  }

  useEffect(() => {
    dispatch(fetchTours())
    autoSendLocation()
  }, [])

  const startTourHandler = async (): Promise<void> => {
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

  const handleCloseTourModal = (): void =>
    setPassengerState((prevState) => ({
      ...prevState,
      startText: "",
      endText: "",
      startTextUI: "",
      endTextUI: "",
      modalVisible: false,
    }))

  const handleCloseMapOptionModal = useCallback((): void => {
    setPassengerState((prevState) => ({
      ...prevState,
      mapOptionModalVisible: false,
    }))
  }, [setPassengerState])

  const ItemSeperatorComponent = (): JSX.Element => (
    <View style={{ marginHorizontal: "5%", marginVertical: "1%" }}>
      <Divider style={{ height: 1 }} />
    </View>
  )

  const pickStartDay = (): JSX.Element => (
    <Pressable
      android_ripple={{ color: "gray" }}
      style={styles.CalendatButtons}
      onPress={() => showModeStart("date")}
    >
      <Text style={styles.CalendarButtonsText}>Pick start day</Text>
    </Pressable>
  )

  const pickStartTime = (): JSX.Element => (
    <Pressable
      android_ripple={{ color: "gray" }}
      style={styles.CalendatButtons}
      onPress={() => showModeStart("time")}
    >
      <Text style={styles.CalendarButtonsText}>Pick start time</Text>
    </Pressable>
  )

  const pickEndTime = (): JSX.Element => (
    <Pressable
      android_ripple={{ color: "gray" }}
      style={styles.CalendatButtons}
      onPress={() => showModeEnd("time")}
    >
      <Text style={styles.CalendarButtonsText}>Pick end time</Text>
    </Pressable>
  )

  const handleClearStartText = (): void =>
    setPassengerState((prevState) => ({
      ...prevState,
      startText: "",
      startTextUI: "",
    }))

  const handleClearEndText = (): void =>
    setPassengerState((prevState) => ({
      ...prevState,
      endText: "",
      endTextUI: "",
    }))

  const dataSeperator = (): JSX.Element => <View style={styles.dataSeperator} />

  const showTourStartsOn = (): JSX.Element => (
    <>
      {dataSeperator()}
      <PassengerTourStartText
        handleClearStartText={handleClearStartText}
        startText={passengerState.startTextUI}
      />
    </>
  )

  const showTourEndsAt = (): JSX.Element => (
    <PassengerTourEndText
      handleClearEndText={handleClearEndText}
      endTextUI={passengerState.endTextUI}
    />
  )

  const cancelStartButtons = (): JSX.Element => (
    <View style={styles.cancelStartButtonsWrapper}>
      <IconButton
        containerColor="white"
        icon="close"
        iconColor={themeColors.googleRed}
        style={{
          marginVertical: 10,
        }}
        size={20}
        onPress={handleCloseTourModal}
      />
      <IconButton
        disabled={!passengerState.startText || !passengerState.endText}
        containerColor="white"
        icon="check"
        iconColor={themeColors.googleGreen}
        style={{
          marginVertical: 10,
        }}
        size={20}
        onPress={startTourHandler}
      />
    </View>
  )

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
                  {isAndroid && (
                    <ActivityIndicator
                      size="small"
                      color={chosenSpinnerColor}
                      style={styles.androidActivity}
                    />
                  )}
                </React.Fragment>
              )}
            </>
          </View>
        )}
        <View style={styles.errorWrapper}>
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
              {pickStartDay()}

              {pickStartTime()}

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

              {pickEndTime()}

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

              {passengerState.startText && showTourStartsOn()}

              {passengerState.endText && showTourEndsAt()}

              {cancelStartButtons()}
            </View>
          </View>
        </Modal>

        <Modal
          visible={passengerState.mapOptionModalVisible}
          animationType="slide"
          transparent={true}
        >
          <PassengerMapInfoModalContent
            handleCloseMapOptionModal={handleCloseMapOptionModal}
          />
        </Modal>

        <PassengerFlatlist ItemSeperatorComponent={ItemSeperatorComponent} />
      </View>
    </React.Fragment>
  )
}

export default Passenger
