import React from "react"
import { TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

type FunctionProps = {
  setPhoneNumber: (args?: any) => void
}

type TextInputPhoneProps = FunctionProps & {
  phoneNumber: string
}

function TextInputPhone({ ...props }: TextInputPhoneProps) {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      activeUnderlineColor={themeColors.googleGreen}
      textColor="black"
      placeholderTextColor="silver"
      placeholder="Cell Phone (********)"
      caretHidden={true}
      keyboardType="phone-pad"
      value={props.phoneNumber}
      onChangeText={(value) => props.setPhoneNumber(value)}
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

export default TextInputPhone
