import React from "react"
import { TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"
import { themeColors } from "../../config/themeColors"

type FunctionProps = {
  setPassword: (args?: any) => void
}

type TextInputPasswordProps = FunctionProps & {
  password: string
}

function TextInputPassword({ ...props }: TextInputPasswordProps) {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      activeUnderlineColor={themeColors.googleGreen}
      textColor="black"
      placeholderTextColor="silver"
      placeholder="Password"
      secureTextEntry={true}
      value={props.password}
      onChangeText={(value) => props.setPassword(value)}
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

export default TextInputPassword
