import { Pressable, StyleSheet, Text, Platform } from "react-native"
import React from "react"
import { themeColors } from "../../config/themeColors"

type NavigationProps = {
  replace: any
}

const isAndroid = Platform.OS === "android"

const LandingSignInBTN = ({ replace }: NavigationProps) => {
  return (
    <React.Fragment>
      <Pressable
        style={styles.blueButtons}
        android_ripple={{
          color: themeColors.googleLightGray,
          radius: 50,
          borderless: true,
          foreground: true,
        }}
        onPress={() => replace("Login")}
      >
        <Text style={styles.blueText}>LOG IN</Text>
      </Pressable>
    </React.Fragment>
  )
}

export default LandingSignInBTN

const styles = StyleSheet.create({
  blueButtons: {
    backgroundColor: themeColors.googleGray,
    width: "48%",
    padding: 10,
    borderRadius: 3,
    borderWidth: isAndroid ? 0.5 : 0,
    borderColor: isAndroid ? "darkgray" : undefined,
  },
  blueText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
})
