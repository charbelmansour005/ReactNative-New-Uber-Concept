import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeColors } from "../../../config/themeColors"

type Props = {}

const PassengerFlatListFooter = (props: Props) => {
  return (
    <View style={{ marginBottom: 200 }}>
      <View style={styles.listFooterWrapper}>
        <Text style={styles.listFooterText}>End Reached</Text>
      </View>
    </View>
  )
}

export default PassengerFlatListFooter

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
})