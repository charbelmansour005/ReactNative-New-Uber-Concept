import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"
import { Dimensions } from "react-native"

export const styles = StyleSheet.create({
  listFooterText: {
    color: themeColors.googleGray,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    backgroundColor: themeColors.googleLightGray,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
  },
  listFooterWrapper: {
    marginBottom: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.googleLightGray,
    marginTop: 20,
  },
  cardFindText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardFindButton: {
    backgroundColor: themeColors.googleBlue,
    paddingVertical: 8,
    width: "100%",
    borderRadius: 5,
    borderRightColor: "#dbdbdb",
    marginTop: 10,
  },
  cardWrapper: {
    marginHorizontal: 10,
    borderRadius: 2,
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  // styling of the map, % it takes from view
  normal: {
    opacity: 1,
    width: "100%",
    height: Dimensions.get("screen").height * 0.3,
  },
  blur: {
    opacity: 0.2,
    width: "100%",
    height: Dimensions.get("screen").height * 0.3,
  },
  container: {
    flex: 1,
    backgroundColor: "#dbdbdb",
  },
})
