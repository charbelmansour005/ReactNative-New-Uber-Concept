import { themeColors } from "../../config/themeColors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  navigateText: {
    color: "white",
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    // backgroundColor: themeColors.googleGray,
    width: "20%",
    borderRadius: 0,
    padding: 8,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  navigateTextSkip: {
    color: "white",
    textTransform: "capitalize",
    fontWeight: "bold",
    // backgroundColor: themeColors.googleGray,
    width: "20%",
    borderRadius: 0,
    padding: 8,
    textAlign: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#ffffff",
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: 320,
    marginVertical: 32,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: "7%",
    color: "#ffffff",
  },
  dotStyle: {
    backgroundColor: "#888",
  },
  activeDotStyle: {
    backgroundColor: "white",
  },
})
