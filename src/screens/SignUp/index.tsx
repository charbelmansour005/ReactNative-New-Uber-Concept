import { Text, SafeAreaView, Pressable } from "react-native"
import React, { useState, Fragment } from "react"
import { StatusBar } from "expo-status-bar"
// UI
import { useToast } from "react-native-toast-notifications"
import { Ionicons } from "@expo/vector-icons"
import { themeColors } from "../../config/themeColors"
// fetching
import { useMutation } from "react-query"
import { instance, signUpURL } from "../../services/api"
// types
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../navigation/Navigation"
import { styles } from "./styles"
import { Durations } from "../../helpers/durations"
// components
import {
  TextInputName,
  TextInputPhone,
  TextInputPassword,
  TextInputConfirmPass,
  RadioButtonRole,
} from "../../components"

type LoginNavProp = StackNavigationProp<RootStackParamList, "Login">

type SignUpState = {
  name: string
  password: string
  confirmedPassword: string
  phoneNumber: string
  role: string
}

type Props = {
  navigation: LoginNavProp
}

interface SignUpTexts {
  title: string
  subTitle: string
}

const initialSignUpState: SignUpState = {
  name: "",
  password: "",
  confirmedPassword: "",
  phoneNumber: "",
  role: "",
}

const SignUp = ({ navigation }: Props) => {
  const { replace } = navigation

  const [signupState, setSignUpState] =
    useState<SignUpState>(initialSignUpState)

  const SignUpTexts: SignUpTexts = {
    title: "Create your account",
    subTitle:
      "Please note that phone verification is required for signup. Your number will be used to verify your identity upon login.",
  }

  const toast = useToast()

  const onSignUpToast = () =>
    toast.show(`Sign up successful! \n\nPlease login to continue`, {
      placement: "bottom",
      duration: Durations.MEDIUM,
      animationType: "zoom-in",
      type: "normal",
      icon: <Ionicons name="checkmark-outline" size={10} color="white" />,
      textStyle: { fontWeight: "300" },
    })

  const errorToast = (error: any) =>
    toast.show(`${error}`, {
      placement: "bottom",
      duration: Durations.MEDIUM,
      animationType: "zoom-in",
      type: "error",
      icon: <Ionicons name="warning-outline" size={10} color="white" />,
      textStyle: { fontWeight: "300" },
    })

  const { mutate, isLoading: isSigningUp } = useMutation(
    async () => {
      const response = await instance.post(signUpURL, {
        name: signupState.name,
        password: signupState.password,
        phoneNumber: signupState.phoneNumber,
        role: signupState.role,
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
    if (signupState.password !== signupState.confirmedPassword) {
      toast.show("Passwords do not match", { type: "error" })
      return
    }
    mutate()
  }

  const header = () => (
    <Fragment>
      <Text style={styles.title}>{SignUpTexts.title}</Text>
      <Text style={styles.paragraph}>{SignUpTexts.subTitle}</Text>
    </Fragment>
  )

  const isDisabled =
    isSigningUp ||
    !signupState.role ||
    !signupState.name ||
    signupState.password.length < 8 ||
    !signupState.confirmedPassword ||
    !signupState.phoneNumber

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeColors.googleGray} style="light" />
      {header()}

      <TextInputName
        name={signupState.name}
        setName={(value) =>
          setSignUpState((prevState) => ({ ...prevState, name: value }))
        }
      />

      <TextInputPhone
        phoneNumber={signupState.phoneNumber}
        setPhoneNumber={(value) =>
          setSignUpState((prevState) => ({ ...prevState, phoneNumber: value }))
        }
      />

      <TextInputPassword
        password={signupState.password}
        setPassword={(value) =>
          setSignUpState((prevState) => ({ ...prevState, password: value }))
        }
      />

      <TextInputConfirmPass
        confirmedPassword={signupState.confirmedPassword}
        setConfirmedPassword={(value) =>
          setSignUpState((prevState) => ({
            ...prevState,
            confirmedPassword: value,
          }))
        }
      />

      <RadioButtonRole
        setRole={(value) =>
          setSignUpState((prevState) => ({ ...prevState, role: value }))
        }
        role={signupState.role}
      />

      <Pressable
        android_ripple={{ color: "white" }}
        style={{
          backgroundColor: themeColors.googleBlue,
          borderWidth: 2,
          borderColor: themeColors.googleBlue,
          ...styles.signUpBtn,
        }}
        onPress={onSignUp}
        disabled={isDisabled}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {isSigningUp ? "Loading" : "Create Account"}
        </Text>
      </Pressable>

      <Pressable
        android_ripple={{ color: "white" }}
        style={{
          backgroundColor: "transparent",
          borderColor: themeColors.googleBlue,
          borderWidth: 2,
          ...styles.signUpBtn,
        }}
        onPress={() => replace("Login")}
        disabled={isSigningUp}
      >
        <Text
          style={{
            color: themeColors.googleBlue,
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default SignUp
