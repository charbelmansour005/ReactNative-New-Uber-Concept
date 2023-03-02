import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

export const styles = StyleSheet.create({
  centerLoad: {
    position: "absolute",
    left: 1,
    right: 1,
    top: 1,
    bottom: 0,
    marginTop: "70%",
  },
  belowButtons: {
    borderRadius: 5,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 1,
  },
  mainWrapper: {
    borderTopWidth: 3,
    marginTop: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    padding: 5,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: themeColors.googleGray,
  },
  normal: {
    opacity: 1,
    width: "100%",
  },
  blur: {
    opacity: 0.1,
    width: "100%",
  },
})
