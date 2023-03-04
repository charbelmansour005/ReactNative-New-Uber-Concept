import { StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { Paragraph } from "react-native-paper"

type Props = {
  handleCloseMapOptionModal: () => void
}

const PassnegerMapInfoModalContent = ({ ...props }: Props) => {
  return (
    <React.Fragment>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Paragraph style={{ padding: 10 }}>
            {
              "The map allows you to locate where you currently are\n\nYou can press on the eye to toggle it (show/hide)"
            }
          </Paragraph>
          <TouchableOpacity
            onPress={props.handleCloseMapOptionModal}
            style={styles.closeButton}
          >
            <Paragraph style={{ fontSize: 13 }}>Close</Paragraph>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  )
}

export default PassnegerMapInfoModalContent

const styles = StyleSheet.create({
  closeButton: {
    marginVertical: "5%",
    backgroundColor: "silver",
    padding: 5,
    paddingHorizontal: 9,
    borderRadius: 5,
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
})
