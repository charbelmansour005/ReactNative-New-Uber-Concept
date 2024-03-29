import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

export const styles = StyleSheet.create({
  title: {
    color: themeColors.googleGray,
    fontWeight: "bold",
    fontSize: 33,
  },
  paragraph: {
    color: "gray",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 15,
    marginHorizontal: "8%",
    backgroundColor: "#dbdbdb",
    padding: 5,
    lineHeight: 18.5,
    borderRadius: 3,
    marginVertical: "3%",
  },
  container: {
    backgroundColor: "#f7f7f8",
    width: "100%",
    height: "100%",
  },
  signUpBtn: {
    marginTop: 10,
    padding: 8,
    width: "83%",
    borderRadius: 8,
    marginBottom: "3%",
  },
  loginText: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
  },
  signupText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginLeft: 10,
    fontWeight: "normal",
    backgroundColor: themeColors.googleBlue,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  loginWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    width: "83%",
    borderWidth: 1,
    borderColor: themeColors.googleLightGray,
  },
  orWrapper: {
    display: "flex",
    flexDirection: "row",
    marginVertical: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  orLine: {
    height: 1,
    backgroundColor: themeColors.googleLightGray,
    width: "30%",
  },
  signUpText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
})
