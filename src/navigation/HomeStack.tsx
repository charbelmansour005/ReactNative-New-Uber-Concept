import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { IconButton } from "react-native-paper"
import { Linking } from "react-native"
import { themeColors } from "../config/themeColors"
import { Landing, Welcome, SignUp, Login, Intro } from "../screens"
import { chosenScreenAnimation } from "../helpers/screen_animations"

export type RootStackParamList = {
  Landing: undefined
  Welcome: undefined
  SignUp: undefined
  Login: undefined
  Driver: undefined
  Passenger: undefined
  Intro: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const HomeStack = () => {
  const handlePress = (): void => {
    Linking.openURL("https://www.google.com/maps/")
  }

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ animation: chosenScreenAnimation }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          gestureDirection: "vertical",
          animation: chosenScreenAnimation,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
          animation: chosenScreenAnimation,
        }}
      />

      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          title: "",
          headerShown: true,
          gestureDirection: "horizontal",
          animation: chosenScreenAnimation,
          headerStyle: {
            backgroundColor: themeColors.googleLightGray,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <>
              <IconButton
                icon="information-outline"
                iconColor={themeColors.googleGray}
                size={24}
                onPress={handlePress}
              />
            </>
          ),
          headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
