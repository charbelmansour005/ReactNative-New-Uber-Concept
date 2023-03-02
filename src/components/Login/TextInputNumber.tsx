import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { TextInput } from "react-native-paper"

interface Props {
  phoneNumber: string | undefined
  setPhoneNumber: (args?: any) => void
}

const TextInputNumber = ({ ...props }: Props) => {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      activeUnderlineColor="#4A89F3"
      textColor="black"
      placeholderTextColor="silver"
      outlineColor="gray"
      placeholder="Phone Number"
      keyboardType="numeric"
      autoFocus={true}
      value={props.phoneNumber}
      onChangeText={(value) => props.setPhoneNumber(value)}
    />
  )
}

export default TextInputNumber

const styles = StyleSheet.create({
  input: {
    width: "82%",
    backgroundColor: "#f7f7f8",
    marginTop: 10,
  },
})
