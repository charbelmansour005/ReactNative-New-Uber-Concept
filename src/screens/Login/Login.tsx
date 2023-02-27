import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native"
import React, { useState } from "react"
import { useAppDispatch } from "../../redux/app/rtkHooks"
import { setUser } from "../../redux/login/loginSlice"
import { StatusBar } from "expo-status-bar"
import { themeColors } from "../../config/themeColors"
import { useMutation } from "react-query"
import { useToast } from "react-native-toast-notifications"
import * as SecureStore from "expo-secure-store"
import { Ionicons } from "@expo/vector-icons"
import { RootStackParamList } from "../../navigation/Navigation"
// components
import TextInputNumber from "../../components/Login/TextInputNumber"
import TextInputPass from "../../components/Login/TextInputPass"
import { instance } from "../../services/api"
import { StackNavigationProp } from "@react-navigation/stack"

const signinUrl = "/auth/signin"

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>

type Props = {
  navigation: SignUpScreenNavigationProp
}

const Login = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const { replace } = navigation
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const toast = useToast()

  const errorToast = (error: any) =>
    toast.show(`${error}`, {
      placement: "bottom",
      duration: 5000,
      animationType: "zoom-in",
      type: "error",
      icon: <Ionicons name="warning-outline" size={10} color="white" />,
      textStyle: { fontWeight: "300" },
    })

  const { mutate, isLoading: isLogginIn } = useMutation(
    async () => {
      const response = await instance.post(signinUrl, {
        phoneNumber,
        password,
      })
      return response.data
    },
    {
      onSuccess: async (response) => {
        console.log(response)
        await SecureStore.setItemAsync("access_token", response.access_token)
        try {
          const findRoleResponse = await instance.get(`/auth/whoami`)
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
      <TextInputNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <TextInputPass password={password} setPassword={setPassword} />
      <Pressable
        disabled={!phoneNumber || password === "" || isLogginIn}
        android_ripple={{ color: "white" }}
        style={styles.loginButton}
        onPress={onSignIn}
      >
        <Text style={styles.loadingLogin}>
          {isLogginIn ? "Loading" : "Log In"}
        </Text>
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

const styles = StyleSheet.create({
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 33,
  },
  loadingLogin: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: "#4A89F3",
    paddingVertical: 10,
    width: "82%",
    borderRadius: 3,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f8",
    width: "100%",
    height: "100%",
  },
  input: {
    width: "82%",
    backgroundColor: "#f7f7f8",
    marginTop: 10,
  },
  loginText: {
    color: "black",
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
  signupText: {
    color: "#4A89F3",
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
})
