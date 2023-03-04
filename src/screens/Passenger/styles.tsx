import { themeColors } from "../../config/themeColors"
import { StyleSheet, Dimensions } from "react-native"

export const styles = StyleSheet.create({
  //insta search bar
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    // marginHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 5,
    marginRight: "2%",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    // flex: 1,
    height: 40,
    borderRadius: 5,
    width: "50%",
  },
  //insta search bar end
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
    opacity: 0.7,
    width: "100%",
    height: Dimensions.get("screen").height * 0.3,
  },
  ChosenData: {
    backgroundColor: themeColors.googleGreen,
    padding: 10,
    borderRadius: 0,
    width: "100%",
    marginVertical: 2,
  },
  CalendarButtonsText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "normal",
    padding: 5,
  },
  CalendatButtons: {
    backgroundColor: themeColors.googleBlue,
    paddingVertical: 5,
    width: "100%",
    borderRadius: 8,
    marginVertical: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#dbdbdb",
  },
  mapPassenger: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 0,
    height: "100%",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  //modal map
  modalMap: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainerMap: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  androidActivity: {
    position: "absolute",
    left: 1,
    right: 1,
    top: 1,
    bottom: 1,
  },
  errorWrapper: {
    borderTopColor: "white",
    borderTopWidth: 3,
    display: "flex",
    flexDirection: "row",
  },
  chosenText: {
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
  },
  dataSeperator: {
    height: 1,
    width: "100%",
    marginHorizontal: 3,
    backgroundColor: "gray",
    marginVertical: 2,
    borderRadius: 3,
  },
  cancelStartButtonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerRightWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})
