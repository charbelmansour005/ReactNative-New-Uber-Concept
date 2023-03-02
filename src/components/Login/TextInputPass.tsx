import { StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { IconButton, TextInput } from "react-native-paper"

type TextInputPassProps = {
  password: string | undefined
  setPassword: (args?: any) => void
}

const TextInputPass = ({ password, setPassword }: TextInputPassProps) => {
  const [hidePassword, setHidePassword] = useState(true)

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        mode="flat"
        activeUnderlineColor="#4A89F3"
        textColor="black"
        placeholderTextColor="silver"
        outlineColor="gray"
        placeholder="Password"
        secureTextEntry={hidePassword}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <IconButton
        icon={hidePassword ? "eye-off" : "eye"}
        onPress={toggleHidePassword}
      />
    </View>
  )
}

export default TextInputPass

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "82%",
    backgroundColor: "#f7f7f8",
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f7f7f8",
  },
})
