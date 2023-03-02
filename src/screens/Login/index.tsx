import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native"
import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { TextInputNumber, TextInputPass } from "../../components"
import { RootStackParamList } from "../../navigation/Navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { instance, signinUrl, roleURL } from "../../services/api"
import * as SecureStore from "expo-secure-store"
import { useMutation } from "react-query"
import { setUser } from "../../redux/login/loginSlice"
import { useAppDispatch } from "../../redux/app/rtkHooks"
import { themeColors } from "../../config/themeColors"
import { useToast } from "react-native-toast-notifications"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"
import { Durations } from "../../helpers/durations"

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>

type Props = {
  navigation: SignUpScreenNavigationProp
}

const Login = ({ navigation }: Props) => {
  const isAndroid = Platform.OS === "android"
  const dispatch = useAppDispatch()
  const { replace } = navigation
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const toast = useToast()

  const errorToast = (error: any) =>
    toast.show(`${error}`, {
      placement: "bottom",
      duration: Durations.LONG,
      animationType: "zoom-in",
      type: "error",
      icon: <Ionicons name="warning-outline" size={10} color="white" />,
      textStyle: { fontWeight: "300" },
    })

  const { mutate, isLoading: isLoggingIn } = useMutation(
    async () => {
      const response = await instance.post(signinUrl, {
        phoneNumber,
        password,
      })
      return response.data
    },
    {
      onSuccess: async (response) => {
        await SecureStore.setItemAsync("access_token", response.access_token)
        try {
          const findRoleResponse = await instance.get(roleURL)
          await SecureStore.setItemAsync("role", findRoleResponse.data?.role)
          const PersonName = findRoleResponse.data?.name
          await SecureStore.setItemAsync("PersonName", PersonName)
          const role = await SecureStore.getItemAsync("role")
          dispatch(
            setUser({
              access_token: response.access_token,
              role: role,
            })
          )
        } catch (error: any) {
          throw new Error(error)
        }
      },
      onError: (error: any) => {
        if (error.response) {
          const message = error.response.data.message
          errorToast(message)
        }
      },
    }
  )

  const onSignIn = () => {
    mutate()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeColors.googleGray} style="light" />

      <Text style={styles.titleText}>Welcome back</Text>

      <View style={styles.inputWrapper}>
        <TextInputNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />

        <TextInputPass password={password} setPassword={setPassword} />
      </View>

      <Pressable
        disabled={!phoneNumber || password === "" || isLoggingIn}
        android_ripple={{ color: "white" }}
        style={styles.loginButton}
        onPress={onSignIn}
      >
        {isLoggingIn ? (
          isAndroid ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                ...styles.loadingLogin,
              }}
            >
              Logging in
            </Text>
          )
        ) : (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              ...styles.loadingLogin,
            }}
          >
            Login
          </Text>
        )}
      </Pressable>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={styles.loginText}>Don't have an account?</Text>
        <Text style={styles.signupText} onPress={() => replace("SignUp")}>
          Sign up
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Login
