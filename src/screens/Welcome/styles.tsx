import { Dimensions, StyleSheet } from "react-native"

const { height, width } = Dimensions.get("screen")

export const styles = StyleSheet.create({
  mainWrapper: { height: "100%", width: "100%" },
  subTitle: { color: "white", fontSize: 12 },
  chipStyle: {
    backgroundColor: "black",
    height: 35,
    borderColor: "black",
    borderWidth: 1,
  },
  chipWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "35%",
  },
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
    // resizeMode: "cover",
    backgroundColor: "white",
  },
  navigateText: {
    color: "black",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: 10,
    marginHorizontal: "5%",
  },
  navigate: {
    width: "100%",
    borderRadius: 1,
    position: "absolute",
    bottom: 0,
    marginBottom: height * 0.02,
  },
  animation: {
    width: "100%",
    height: 100,
    aspectRatio: 1,
    marginTop: "40%",
  },
  animationWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  welcomeTitle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width * 0.1,
  },
})
