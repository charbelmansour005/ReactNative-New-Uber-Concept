import {
  Text,
  Pressable,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native"
import React, { useState, Fragment } from "react"
import { StatusBar } from "expo-status-bar"
import { useToast } from "react-native-toast-notifications"
import { Ionicons } from "@expo/vector-icons"
import { themeColors } from "../../config/themeColors"
import { useMutation } from "react-query"
import { instance, signUpURL } from "../../services/api"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../navigation/Navigation"
import { styles } from "./styles"
import { Durations } from "../../helpers/durations"
import { z } from "zod"
import {
  TextInputName,
  TextInputPhone,
  TextInputPassword,
  TextInputConfirmPass,
  RadioButtonRole,
} from "../../components"

type LoginNavProp = StackNavigationProp<RootStackParamList, "Login">

const SignUpStateSchema = z.object({
  name: z.string(),
  password: z.string(),
  confirmedPassword: z.string(),
  phoneNumber: z.string(),
  role: z.string(),
})

type SignUpState = z.infer<typeof SignUpStateSchema>

const initialSignUpState: SignUpState = {
  name: "",
  password: "",
  confirmedPassword: "",
  phoneNumber: "",
  role: "",
}

type Props = {
  navigation: LoginNavProp
}

interface SignUpTexts {
  title: string
}

let SignUpTexts: SignUpTexts = {
  title: "Create your account",
}

const SignUp = ({ navigation }: Props) => {
  const { replace } = navigation

  const [signupState, setSignUpState] =
    useState<SignUpState>(initialSignUpState)

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

  const header = () => <Text style={styles.title}>{SignUpTexts.title}</Text>

  const body = () => (
    <Fragment>
      <TextInputName
        name={signupState.name}
        setName={(value) =>
          setSignUpState((prevState) => ({ ...prevState, name: value }))
        }
      />

      <TextInputPhone
        phoneNumber={signupState.phoneNumber}
        setPhoneNumber={(value) =>
          setSignUpState((prevState) => ({
            ...prevState,
            phoneNumber: value,
          }))
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
    </Fragment>
  )

  const signUpButton = () => (
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
      <Text style={styles.signUpText}>
        {isSigningUp ? "Loading" : "Create Account"}
      </Text>
    </Pressable>
  )

  const footer = () => (
    <>
      <View style={styles.orWrapper}>
        <View style={styles.orLine} />
        <Text style={{ marginHorizontal: 10 }}>OR</Text>
        <View style={styles.orLine} />
      </View>

      <View style={styles.loginWrapper}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signupText} onPress={() => replace("Login")}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )

  const isDisabled =
    isSigningUp ||
    !signupState.role ||
    !signupState.name ||
    signupState.password.length < 8 ||
    !signupState.confirmedPassword ||
    !signupState.phoneNumber

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <StatusBar backgroundColor="#f7f7f8" style="dark" />
      {header()}

      {body()}

      {signUpButton()}

      {footer()}
    </ScrollView>
  )
}

export default SignUp
