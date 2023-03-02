import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useLayoutEffect } from "react"
import { themeColors } from "../../config/themeColors"
import * as SecureStore from "expo-secure-store"
import { setUser } from "../../redux/login/loginSlice"
import { useAppDispatch } from "../../redux/app/rtkHooks"

const Settings = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
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
        backgroundColor: themeColors.googleLightGray,
      },
      headerTintColor: themeColors.googleGray,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    })
  }, [navigation])

  return (
    <React.Fragment>
      <View style={styles.logoutWrapper}>
        <View style={styles.listHeaderWrapper}>
          <Pressable
            android_ripple={{ color: "gray" }}
            style={styles.logoutButton}
            onPress={askLogout}
          >
            <Text style={styles.listHeaderText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </React.Fragment>
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
    backgroundColor: themeColors.googleRed,
    borderRadius: 3,
    marginVertical: 5,
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
