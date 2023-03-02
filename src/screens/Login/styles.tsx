import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20%",
  },
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 33,
  },
  loadingLogin: {
    fontSize: 16,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: "#4A89F3",
    padding: 13,
    width: "90%",
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
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
  signupText: {
    color: "#4A89F3",
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
})
