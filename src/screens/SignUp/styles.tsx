import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

export const styles = StyleSheet.create({
  title: {
    color: themeColors.googleGray,
    fontWeight: "bold",
    fontSize: 33,
  },
  paragraph: {
    color: "black",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f8",
    width: "100%",
    height: "100%",
  },
  signUpBtn: {
    marginTop: 15,
    padding: 10,
    width: "90%",
    borderRadius: 3,
  },
})
