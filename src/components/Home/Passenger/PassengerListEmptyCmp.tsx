import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeColors } from "../../../config/themeColors"

const PassengerListEmptyCmp = () => {
  return (
    <View style={styles.listFooterWrapper}>
      <Text style={styles.listFooterText}>
        You haven't started any tours yet
      </Text>
    </View>
  )
}

export default PassengerListEmptyCmp

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
