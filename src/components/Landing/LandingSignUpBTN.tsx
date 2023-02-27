import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeColors } from "../../config/themeColors"

type NavigationProps = {
  replace: any
}

export const LandingSignUpBTN = ({ replace }: NavigationProps) => {
  return (
    <React.Fragment>
      <Pressable
        style={styles.blueButtons}
        android_ripple={{
          color: themeColors.googleBlue,
          radius: 30,
          borderless: true,
        }}
        onPress={() => replace("SignUp")}
      >
        <Text style={styles.blueText}>SIGN UP</Text>
      </Pressable>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  blueButtons: {
    backgroundColor: themeColors.googleGray,
    width: "48%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "darkgray",
  },
  blueText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
})
