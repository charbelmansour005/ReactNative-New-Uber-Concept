import React from "react"
import { TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

interface FunctionProps {
  setConfirmedPassword: (args?: any) => void
}

interface TextInputConfirmPassProps extends FunctionProps {
  confirmedPassword: string
}

function TextInputConfirmPass({ ...props }: TextInputConfirmPassProps) {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      activeUnderlineColor={themeColors.googleGreen}
      textColor="black"
      placeholderTextColor="silver"
      secureTextEntry={true}
      value={props.confirmedPassword}
      placeholder="Verify password"
      onChangeText={(value) => props.setConfirmedPassword(value)}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    backgroundColor: "#f7f7f8",
    marginTop: 3,
  },
})

export default TextInputConfirmPass
