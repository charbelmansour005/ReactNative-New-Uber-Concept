import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { TextInput } from "react-native-paper"

type TextInputPassProps = {
  password: any
  setPassword: (args?: any) => void
}

const TextInputPass = ({ password, setPassword }: TextInputPassProps) => {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      activeUnderlineColor="#4A89F3"
      textColor="black"
      placeholderTextColor="silver"
      outlineColor="gray"
      placeholder="Password"
      secureTextEntry={true}
      value={password}
      onChangeText={(value) => setPassword(value)}
    />
  )
}

export default TextInputPass

const styles = StyleSheet.create({
  input: {
    width: "82%",
    backgroundColor: "#f7f7f8",
    marginTop: 10,
  },
})
