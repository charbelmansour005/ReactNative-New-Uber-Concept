import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
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
import { useToast } from "react-native-toast-notifications"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"
import { Durations } from "../../helpers/durations"
import { TouchableOpacity } from "react-native-gesture-handler"

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
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const toast = useToast()

  const windowHeight = useWindowDimensions().height

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

  const title = () => <Text style={styles.titleText}>Uber Tour</Text>

  const bodyInputs = () => (
    <View style={styles.inputWrapper}>
      <TextInputNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />

      <TextInputPass password={password} setPassword={setPassword} />
    </View>
  )

  const loginButton = () => (
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
            fontWeight: "normal",
            ...styles.loadingLogin,
          }}
        >
          Login
        </Text>
      )}
    </Pressable>
  )

  const orSeperator = () => (
    <View style={styles.orWrapper}>
      <View style={styles.orLine} />
      <Text style={{ marginHorizontal: 10 }}>OR</Text>
      <View style={styles.orLine} />
    </View>
  )

  const signUpPrompt = () => (
    <View style={styles.noAccountWrapper}>
      <Text style={styles.loginText}>Don't have an account?</Text>
      <TouchableOpacity>
        <Text style={styles.signupText} onPress={() => replace("SignUp")}>
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView
      style={{ minHeight: Math.round(windowHeight), ...styles.container }}
    >
      <StatusBar backgroundColor="#f7f7f8" style="dark" />

      {title()}

      {bodyInputs()}

      {loginButton()}

      {orSeperator()}

      {signUpPrompt()}
    </SafeAreaView>
  )
}

export default Login
