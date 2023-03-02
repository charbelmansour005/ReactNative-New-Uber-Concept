import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native"
import { useAppDispatch, useAppSelector } from "../../../redux/app/rtkHooks"
import React, { useEffect } from "react"
import PassengerCard from "./PassengerCard"
import { fetchTours } from "../../../redux/passenger/tour/tourSlice"
import { themeColors } from "../../../config/themeColors"
import PassengerFlatListFooter from "./PassengerFlatListFooter"
import PassengerListEmptyCmp from "./PassengerListEmptyCmp"
import { Card, Divider, Paragraph } from "react-native-paper"
import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useToast } from "react-native-toast-notifications"
import { Durations } from "../../../helpers/durations"
import { Chip } from "react-native-paper"
import OriginalLoader from "../../UI/OriginalLoader"
import * as SecureStore from "expo-secure-store"

const PassengerFlatlist = () => {
  const dispatch = useAppDispatch()
  const [isShown, setIsShown] = useState<boolean>(false)
  const [name, setName] = useState<string | null>(null)
  const shown = useAppSelector((state) => state.topBar.shown)

  const toast = useToast()

  const passengerTour = useAppSelector((state) => state.passengertour)

  const handleRefreshPassengerTours = () => {
    dispatch(fetchTours())
    toast.show("Tours up to date", {
      duration: Durations.SHORT,
    })
  }

  const numPassengerTours = passengerTour.tours.filter((tour) => tour).length
  const numPassengerToursTaken = passengerTour.tours.filter(
    (tour) => tour.taken
  ).length
  const numPassengerToursAvail = passengerTour.tours.filter(
    (tour) => !tour.taken
  ).length

  useEffect(() => {
    const getShowName = async () => {
      const PersonName: any = await SecureStore.getItemAsync("PersonName")
      setName(PersonName)
    }
    getShowName()
  }, [])

  function getGreeting() {
    const currentHour = new Date().getHours()
    let greeting = ""

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning"
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon"
    } else {
      greeting = "Good evening"
    }

    return greeting
  }

  const greeting = getGreeting()

  const ListFooterCMP = () => (
    <View>
      {passengerTour.tours.length ? (
        <PassengerFlatListFooter />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </View>
  )

  const handleRefresh = async () => {
    handleRefreshPassengerTours()
  }

  return (
    <React.Fragment>
      <FlatList
        endFillColor={themeColors.googleLightGray}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <React.Fragment>
            {passengerTour.status === "loading" && (
              <View
                style={{
                  marginTop: "2%",
                }}
              >
                <OriginalLoader />
              </View>
            )}
            <View
              style={{
                marginTop: shown ? "2%" : "12%",
                ...styles.chipWrapper,
              }}
            >
              <Chip
                textStyle={{ fontSize: 13, fontWeight: "bold" }}
                mode="outlined"
                style={styles.chipStyle}
              >
                {greeting} {name}
              </Chip>
            </View>
            <Card mode="outlined" style={styles.cardContainer}>
              <Card.Content>
                <View style={styles.spaceBetween}>
                  {passengerTour.status === "loading" ? (
                    <Paragraph
                      style={{ color: "gray", ...styles.cardContentText }}
                    >
                      Please wait
                    </Paragraph>
                  ) : (
                    <>
                      <Paragraph
                        style={{ color: "gray", ...styles.cardContentText }}
                      >
                        All your tours
                      </Paragraph>
                      <Paragraph
                        style={{ color: "gray", ...styles.cardContentText }}
                      >
                        {numPassengerTours}
                      </Paragraph>
                    </>
                  )}
                </View>

                {isShown && (
                  <>
                    <Divider />
                    <View style={styles.spaceBetween}>
                      <Paragraph
                        style={{
                          color:
                            passengerTour.status === "loading"
                              ? "gray"
                              : themeColors.googleBlue,
                          ...styles.cardContentText,
                        }}
                      >
                        {passengerTour.status === "loading"
                          ? "Please wait"
                          : "Your booked tours"}
                      </Paragraph>
                      <Paragraph
                        style={{
                          color: themeColors.googleBlue,
                          ...styles.cardContentText,
                        }}
                      >
                        {passengerTour.status === "loading"
                          ? ""
                          : numPassengerToursTaken}
                      </Paragraph>
                    </View>
                    <Divider />
                    <View style={styles.spaceBetween}>
                      <Paragraph
                        style={{
                          color:
                            passengerTour.status === "loading"
                              ? "gray"
                              : "orange",
                          ...styles.cardContentText,
                        }}
                      >
                        {passengerTour.status === "loading"
                          ? "Please wait"
                          : "Your pending tours"}
                      </Paragraph>
                      <Paragraph
                        style={{ color: "orange", ...styles.cardContentText }}
                      >
                        {passengerTour.status === "loading"
                          ? ""
                          : numPassengerToursAvail}
                      </Paragraph>
                    </View>
                  </>
                )}
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    disabled={passengerTour.status === "loading"}
                    onLongPress={() =>
                      toast.show(`${isShown ? "Collapse" : "Expand"}`, {
                        placement: "top",
                        duration: Durations.SHORT,
                        type: "success",
                        style: { marginTop: "20%" },
                        textStyle: { fontWeight: "normal" },
                      })
                    }
                    onPress={() => setIsShown(!isShown)}
                  >
                    <Feather
                      name={isShown ? "minimize" : "maximize"}
                      selectable={false}
                      size={20}
                      color={"gray"}
                      style={{
                        marginRight: "5%",
                      }}
                    />
                  </TouchableOpacity>
                  {isShown && (
                    <TouchableOpacity
                      disabled={passengerTour.status === "loading"}
                      onPress={() =>
                        toast.show("Displaying all tour information", {
                          placement: "top",
                          duration: Durations.SHORT,
                          type: "success",
                          style: { marginTop: "30%" },
                          textStyle: { fontWeight: "normal" },
                        })
                      }
                    >
                      <Feather
                        name="info"
                        selectable={false}
                        size={20}
                        color={"gray"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </Card.Content>
            </Card>
          </React.Fragment>
        }
        ListEmptyComponent={<PassengerListEmptyCmp />}
        ListFooterComponent={ListFooterCMP}
        refreshControl={
          <RefreshControl
            enabled={passengerTour.status !== "loading" && !passengerTour.error}
            refreshing={passengerTour.status === "loading"}
            onRefresh={handleRefresh}
            tintColor="black"
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={passengerTour.tours}
        renderItem={({ item, index }) => (
          <PassengerCard
            startDate={new Date(item.startTime).toLocaleDateString()}
            startTime={new Date(item.startTime).toLocaleTimeString()}
            endTime={new Date(item.endTime).toLocaleTimeString()}
            driver={item.driver}
            index={index}
            taken={item.taken}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  chipStyle: {
    height: 35,
    backgroundColor: "white",
    borderColor: themeColors.googleLightGray,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    borderRadius: 4,
  },
  chipWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "2%",
    marginHorizontal: "2%",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardContentText: {
    fontSize: 14,
    marginVertical: 12,
  },
  cardContainer: {
    marginTop: "0%",
    marginBottom: "1%",
    marginHorizontal: "2%",
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 0,
    borderColor: themeColors.googleLightGray,
  },
})

export default PassengerFlatlist
