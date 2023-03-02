import { Dimensions, StyleSheet } from "react-native"

const { height, width } = Dimensions.get("screen")

export const styles = StyleSheet.create({
  mainWrapper: { flex: 1, height: "100%", width: "100%" },
  subTitle: { color: "white", fontSize: 12 },
  chipStyle: {
    backgroundColor: "transparent",
    height: 35,
    borderColor: "white",
    borderWidth: 0.5,
  },
  chipWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  navigateText: {
    color: "white",
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
    height: 300,
    aspectRatio: 1,
    marginTop: "10%",
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
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width * 0.1,
  },
})
