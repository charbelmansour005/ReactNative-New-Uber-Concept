import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useAppDispatch, useAppSelector } from "../../../redux/app/rtkHooks"
import React from "react"
import PassengerCard from "./PassengerCard"
import { fetchTours } from "../../../redux/passenger/tour/tourSlice"
import { themeColors } from "../../../config/themeColors"
import SharedFlatListHeader from "../Shared/SharedFlatListHeader"
import PassengerFlatListFooter from "./PassengerFlatListFooter"
import { setUser } from "../../../redux/login/loginSlice"
import * as SecureStore from "expo-secure-store"

type Props = {}

const PassengerFlatlist = (props: Props) => {
  const dispatch = useAppDispatch()

  const passengerTour = useAppSelector((state) => state.passengertour)

  const handleRefreshPassengerTours = () => {
    dispatch(fetchTours())
  }

  const onLogout = async () => {
    await SecureStore.setItemAsync("access_token", "")
    dispatch(setUser({ access_token: null, role: null }))
  }
  const askLogout = () =>
    Alert.alert(
      "Attention",
      "You are about to logout.\nClick away to cancel.",
      [
        {
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            onLogout()
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const renderListEmptyComponent = () => (
    <View style={styles.listFooterWrapper}>
      <Text style={styles.listFooterText}>
        You haven't started any tours yet
      </Text>
    </View>
  )

  return (
    <React.Fragment>
      <FlatList
        ListHeaderComponent={<SharedFlatListHeader askLogout={askLogout} />}
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={
          <View>
            {passengerTour.tours.length ? (
              <PassengerFlatListFooter />
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </View>
        }
        refreshControl={
          <RefreshControl
            enabled={passengerTour.status !== "loading" && !passengerTour.error}
            refreshing={passengerTour.status === "loading"}
            onRefresh={async () => {
              handleRefreshPassengerTours()
            }}
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

export default PassengerFlatlist

const styles = StyleSheet.create({
  listFooterWrapper: {
    marginBottom: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.googleLightGray,
    marginTop: 20,
  },
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
})
