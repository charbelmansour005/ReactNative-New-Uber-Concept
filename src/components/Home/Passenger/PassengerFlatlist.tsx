import { FlatList, RefreshControl, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../redux/app/rtkHooks"
import React, { useEffect, useState } from "react"
import { fetchTours } from "../../../redux/passenger/tour/tourSlice"
import * as SecureStore from "expo-secure-store"
import { themeColors } from "../../../config/themeColors"
import { useToast } from "react-native-toast-notifications"
import { Durations } from "../../../helpers/durations"
import PassengerCard from "./PassengerCard"
import PassengerFlatListFooter from "./PassengerFlatListFooter"
import PassengerListEmptyCmp from "./PassengerListEmptyCmp"
import PassengerFlatListHeader from "./PassengerFlatListHeader"
import PassengerLoadingCard from "./PassengerLoadingCard"

type Props = {
  ItemSeperatorComponent: () => JSX.Element
}

const PassengerFlatlist = ({ ...props }: Props) => {
  const dispatch = useAppDispatch()
  const [isShown, setIsShown] = useState<boolean>(false)
  const toast = useToast()
  const passengerTour = useAppSelector((state) => state.passengertour)

  const handleRefreshPassengerTours = () => {
    dispatch(fetchTours())
    setTimeout(() => {
      if (
        passengerTour.status !== "loading" &&
        passengerTour.status === "succeeded"
      ) {
        toast.show("Tours up to date", {
          duration: Durations.SHORT,
        })
      }
    }, 1500)
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
      const PersonName: string | null = await SecureStore.getItemAsync(
        "PersonName"
      )
      toast.show(`${greeting} - ${PersonName}`, {
        duration: Durations.SHORT,
        type: "success",
      })
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

  const handleRefresh = () => {
    handleRefreshPassengerTours()
  }

  const handleChevronLongPress = () =>
    toast.show(`${isShown ? "Collapse" : "Expand"}`, {
      placement: "top",
      duration: Durations.SHORT,
      type: "success",
      style: { marginTop: "20%" },
      textStyle: { fontWeight: "normal" },
    })

  const handleInfoOnPress = () =>
    toast.show("Displaying all tour information", {
      placement: "top",
      duration: Durations.SHORT,
      type: "success",
      style: { marginTop: "30%" },
      textStyle: { fontWeight: "normal" },
    })

  return (
    <React.Fragment>
      <FlatList
        endFillColor={themeColors.googleLightGray}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
        extraData={passengerTour.tours}
        ListHeaderComponent={
          <PassengerFlatListHeader
            numPassengerToursAvail={numPassengerToursAvail}
            numPassengerToursTaken={numPassengerToursTaken}
            setIsShown={setIsShown}
            handleInfoOnPress={handleInfoOnPress}
            handleChevronLongPress={handleChevronLongPress}
            numPassengerTours={numPassengerTours}
            isShown={isShown}
          />
        }
        ListEmptyComponent={<PassengerListEmptyCmp />}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        ListFooterComponent={ListFooterCMP}
        // ItemSeparatorComponent={props.ItemSeperatorComponent}
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
          <>
            <PassengerCard
              startDate={new Date(item.startTime).toLocaleDateString()}
              startTime={new Date(item.startTime).toLocaleTimeString()}
              endTime={new Date(item.endTime).toLocaleTimeString()}
              driver={item.driver}
              index={index}
              taken={item.taken}
            />
          </>
        )}
        keyExtractor={(item) => item._id}
      />
    </React.Fragment>
  )
}

export default PassengerFlatlist
