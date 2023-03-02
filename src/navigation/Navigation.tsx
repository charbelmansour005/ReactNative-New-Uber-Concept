import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { IconButton } from "react-native-paper"
import { Linking } from "react-native"
import { useAppSelector } from "../redux/app/rtkHooks"
import { themeColors } from "../config/themeColors"
import {
  Landing,
  Welcome,
  SignUp,
  Login,
  Driver,
  Passenger,
  Intro,
} from "../screens"
import Settings from "../screens/Settings"

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
const Drawer = createDrawerNavigator()

const Navigation = () => {
  const access_token = useAppSelector((state) => state.user.user?.access_token)
  const role = useAppSelector((state) => state.user.user?.role)

  const handlePress = () => {
    Linking.openURL("https://www.google.com/maps/")
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />

        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ animation: "simple_push" }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "Join us",
            headerShown: true,
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
            headerStyle: {
              backgroundColor: themeColors.googleGray,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            gestureDirection: "horizontal",
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            title: "",
            headerShown: true,
            gestureDirection: "horizontal",
            animation: "slide_from_bottom",
            headerStyle: {
              backgroundColor: themeColors.googleGray,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <>
                <IconButton
                  icon="information-outline"
                  iconColor="white"
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

  return (
    <NavigationContainer>
      {access_token == null ? (
        <HomeStack />
      ) : (
        <>
          <Drawer.Navigator
            initialRouteName={role === "passenger" ? "passenger" : "driver"}
          >
            {role === "passenger" && (
              <Drawer.Screen name="Passenger" component={Passenger} />
            )}
            {role === "driver" && (
              <Drawer.Screen name="Driver" component={Driver} />
            )}
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        </>
      )}
    </NavigationContainer>
  )
}

export default Navigation
