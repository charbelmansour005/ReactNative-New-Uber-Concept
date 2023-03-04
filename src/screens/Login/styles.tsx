import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

export const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 33,
    marginBottom: "10%",
  },
  loadingLogin: {
    fontSize: 16,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 1,
    backgroundColor: "#4A89F3",
    padding: 10,
    width: "83%",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f8",
    width: "100%",
    height: "100%",
  },
  input: {
    width: "82%",
    backgroundColor: "#f7f7f8",
    marginTop: 10,
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
  noAccountWrapper: {
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
})
