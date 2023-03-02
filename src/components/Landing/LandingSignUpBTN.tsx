import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeColors } from "../../config/themeColors"

type NavigationProps = {
  replace: any
}

const LandingSignUpBTN = ({ replace }: NavigationProps) => {
  return (
    <React.Fragment>
      <Pressable
        style={styles.blueButtons}
        android_ripple={{
          color: themeColors.googleLightGray,
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
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: "darkgray",
  },
  blueText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
})

export default LandingSignUpBTN
