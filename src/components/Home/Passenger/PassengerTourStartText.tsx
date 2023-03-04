import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeColors } from "../../../config/themeColors"

type Props = {
  startText: string | null
  handleClearStartText: (args?: any) => void
}

const PassengerTourStartText = ({ ...props }: Props) => {
  return (
    <View style={styles.ChosenData}>
      <Text onPress={props.handleClearStartText} style={styles.chosenText}>
        Tour starts on {props.startText}
      </Text>
    </View>
  )
}

export default PassengerTourStartText

const styles = StyleSheet.create({
  chosenText: {
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
  },
  ChosenData: {
    backgroundColor: themeColors.googleGreen,
    padding: 10,
    borderRadius: 0,
    width: "100%",
    marginVertical: 2,
  },
})
