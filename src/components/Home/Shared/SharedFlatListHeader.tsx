import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React from "react"
import { themeColors } from "../../../config/themeColors"

type Props = {
  askLogout: (args?: any) => void
}

const SharedFlatListHeader = ({ ...props }: Props) => {
  return (
    <React.Fragment>
      <View style={styles.logoutWrapper}>
        <View style={styles.listHeaderWrapper}>
          <Pressable
            android_ripple={{ color: "gray" }}
            style={styles.logoutButton}
            onPress={props.askLogout}
          >
            <Text style={styles.listHeaderText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </React.Fragment>
  )
}

export default SharedFlatListHeader

const styles = StyleSheet.create({
  logoutWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    padding: 5,
    backgroundColor: themeColors.googleRed,
    borderRadius: 0,
    marginVertical: 5,
    width: "100%",
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
