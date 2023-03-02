import { StyleSheet, Text, View, Modal } from "react-native"
import React, { useState } from "react"
import { themeColors } from "../../../config/themeColors"
import { Divider, IconButton } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type DriverCardDataProps = {
  index: number
  distanceInKM: number
  startTime: string
  endTime: string
}

const DriverCardData = ({ ...props }: DriverCardDataProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  return (
    <React.Fragment>
      <View style={styles.headerWrapper}>
        <Text style={styles.titleTextWrapper}>Tour Available</Text>
        <IconButton
          containerColor={
            props.distanceInKM * 1000 < 20
              ? themeColors.googleGreen
              : themeColors.googleRed
          }
          size={12}
          icon={() => (
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={20}
              color="white"
            />
          )}
          onPress={showModal}
        />
      </View>
      <Divider style={styles.divider} />
      <View style={{ paddingBottom: 5 }}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color:
              props.distanceInKM * 1000 > 20
                ? themeColors.googleRed
                : themeColors.googleGreen,
          }}
        >
          Distance away: {(props.distanceInKM * 1000).toFixed(1)} meters
        </Text>
      </View>
      <View style={{ paddingBottom: 5 }}>
        <Text style={{ fontWeight: "bold", textAlign: "left", color: "gray" }}>
          Start Time: {new Date(props.startTime).toLocaleDateString()} at{" "}
          {new Date(props.startTime).toLocaleTimeString()}
        </Text>
      </View>
      <View style={{ paddingBottom: 5 }}>
        <Text style={{ fontWeight: "bold", textAlign: "left", color: "gray" }}>
          End Time: {new Date(props.endTime).toLocaleDateString()} at{" "}
          {new Date(props.endTime).toLocaleTimeString()}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View
          style={{
            backgroundColor:
              props.distanceInKM * 1000 > 20
                ? themeColors.googleRed
                : themeColors.googleGreen,
            ...styles.modalWrapper,
          }}
        >
          <View style={styles.modalContentWrapper}>
            <Text style={styles.modalTitleText}>Distance</Text>
            <Text style={styles.modalBodyText}>
              This tour is
              {props.distanceInKM * 1000 > 20 ? " far away" : " near you"}
            </Text>
            <IconButton
              icon="close"
              onPress={hideModal}
              style={styles.modalCloseButton}
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  )
}

export default DriverCardData

const styles = StyleSheet.create({
  divider: {
    marginVertical: 5,
    height: 2,
    backgroundColor: themeColors.googleLightGray,
  },
  titleTextWrapper: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 15,
    color: themeColors.googleGray,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalWrapper: {
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    padding: 20,
  },
  modalContentWrapper: {
    paddingBottom: 20,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBodyText: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
})
