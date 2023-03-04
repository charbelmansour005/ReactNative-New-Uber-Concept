import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeColors } from "../../../config/themeColors"

type Props = {
  endTextUI: string | null
  handleClearEndText: (args?: any) => void
}

const PassengerTourEndText = ({ ...props }: Props) => {
  return (
    <View style={styles.ChosenData}>
      <Text onPress={props.handleClearEndText} style={styles.chosenText}>
        Tour ends at {props.endTextUI}
      </Text>
    </View>
  )
}

export default PassengerTourEndText

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
