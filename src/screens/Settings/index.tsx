import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useLayoutEffect } from "react"
import { themeColors } from "../../config/themeColors"
import * as SecureStore from "expo-secure-store"
import { setUser } from "../../redux/login/loginSlice"
import { useAppDispatch, useAppSelector } from "../../redux/app/rtkHooks"
import { toggleTopBar } from "../../redux/passenger/topBarSlice"
import { StatusBar } from "expo-status-bar"
import { Feather } from "@expo/vector-icons"

const Settings = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const shown = useAppSelector((state) => state.topBar.shown)
  const onLogout = async () => {
    await SecureStore.setItemAsync("access_token", "")
    dispatch(setUser({ access_token: null, role: null }))
  }

  const askLogout = (): void =>
    Alert.alert(
      "Attention",
      "You are about to logout",
      [
        {
          text: "Cancel",
          onPress: (): void => {},
          style: "cancel",
        },
        {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
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
    })
  }, [navigation])

  return (
    <ScrollView>
      <StatusBar backgroundColor="white" style="dark" />
      <View style={styles.logoutWrapper}>
        <View style={styles.listHeaderWrapper}>
          <Pressable
            android_ripple={{ color: "gray" }}
            style={{
              backgroundColor: themeColors.googleRed,
              ...styles.logoutButton,
            }}
            onPress={askLogout}
          >
            <Text style={styles.listHeaderText}>Logout</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.logoutWrapper}>
        <View style={styles.listHeaderWrapper}>
          <Pressable
            android_ripple={{ color: "gray" }}
            style={{
              backgroundColor: themeColors.googleBlue,
              ...styles.logoutButton,
            }}
            onPress={() => dispatch(toggleTopBar())}
          >
            <Text style={styles.listHeaderText}>
              {shown ? "Hide Home Topbar" : "Show Home top bar"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  logoutWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
    width: "90%",
  },
  listHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 12.5,
  },
  listHeaderWrapper: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "darkgray",
    marginTop: 10,
    borderRadius: 1,
    width: Dimensions.get("screen").width * 1,
    minWidth: Dimensions.get("screen").width * 1,
  },
})
