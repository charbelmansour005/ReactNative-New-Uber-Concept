import { StyleSheet, Text, SafeAreaView, Pressable } from "react-native"
import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { useToast } from "react-native-toast-notifications"
import { Ionicons } from "@expo/vector-icons"
import { themeColors } from "../config/themeColors"
import { useMutation } from "react-query"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../navigation/Navigation"
// components
import TextInputName from "../components/SignUp/TextInputName"
import TextInputPhone from "../components/SignUp/TextInputPhone"
import TextInputPassword from "../components/SignUp/TextInputPassword"
import TextInputConfirmPass from "../components/SignUp/TextInputConfirmPass"
import RadioButtonRole from "../components/SignUp/RadioButtonRole"
import { instance } from "../services/api"

type LoginNavProp = StackNavigationProp<RootStackParamList, "Login">

type Props = {
  navigation: LoginNavProp
}

const SignUp = ({ navigation }: Props) => {
  const { replace } = navigation
  const toast = useToast()
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmedPassword, setConfirmedPassword] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<any>("")
  const [role, setRole] = React.useState<any>("driver")

  const signUpURL = "/auth/signup"

  const onSignUpToast = () =>
    toast.show(`Sign up successful! \n\nPlease login to continue`, {
      placement: "bottom",
      duration: 5000,
      animationType: "zoom-in",
      type: "normal",
      icon: <Ionicons name="checkmark-outline" size={10} color="white" />,
      textStyle: { fontWeight: "300" },
    })

  const errorToast = (error: any) =>
    toast.show(`${error}`, {
      placement: "bottom",
      duration: 5000,
      animationType: "zoom-in",
      type: "error",
      icon: <Ionicons name="warning-outline" size={10} color="white" />,
      textStyle: { fontWeight: "300" },
    })

  const { mutate, isLoading: isSigningUp } = useMutation(
    async () => {
      const response = await instance.post(signUpURL, {
        name,
        password,
        phoneNumber,
        role,
      })
      return response.data
    },
    {
      onSuccess: () => {
        onSignUpToast()
        replace("Login")
      },
      onError: (error: any) => {
        if (error.response) {
          const message = error.response.data.message.join(", ")
          errorToast(message)
        }
      },
    }
  )

  const onSignUp = () => {
    if (password !== confirmedPassword) {
      toast.show("Passwords do not match", { type: "error" })
      return
    }
    mutate()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeColors.googleGray} style="light" />
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.paragraph}>
        Please note that phone verification is required for signup. Your number
        will be used to verify your identity upon login.
      </Text>
      <TextInputName name={name} setName={setName} />
      <TextInputPhone
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <TextInputPassword password={password} setPassword={setPassword} />
      <TextInputConfirmPass
        confirmedPassword={confirmedPassword}
        setConfirmedPassword={setConfirmedPassword}
      />
      <RadioButtonRole setRole={setRole} role={role} />
      <Pressable
        android_ripple={{ color: "white" }}
        style={{
          marginTop: 15,
          backgroundColor: themeColors.googleGreen,
          paddingVertical: 10,
          width: "82%",
          borderRadius: 3,
        }}
        onPress={onSignUp}
        disabled={
          isSigningUp ||
          !role ||
          !name ||
          password.length < 8 ||
          !confirmedPassword ||
          !phoneNumber
        }
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {isSigningUp ? "Loading" : "Create Account"}
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  title: {
    color: themeColors.googleGray,
    fontWeight: "bold",
    fontSize: 33,
  },
  paragraph: {
    color: "black",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f8",
    width: "100%",
    height: "100%",
  },
})
