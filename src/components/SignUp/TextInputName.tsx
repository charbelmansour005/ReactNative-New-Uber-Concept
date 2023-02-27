import React from "react"
import { TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

interface FunctionProps {
  setName: (args?: any) => void
}

interface TextInputNameProps extends FunctionProps {
  name: string
}

function TextInputName({ ...props }: TextInputNameProps) {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      activeUnderlineColor={themeColors.googleGreen}
      textColor="black"
      placeholderTextColor="silver"
      placeholder="Name"
      value={props.name}
      onChangeText={(value) => props.setName(value)}
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

export default TextInputName
