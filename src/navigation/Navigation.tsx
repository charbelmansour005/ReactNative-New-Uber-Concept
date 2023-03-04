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
  Weather,
} from "../screens"
import Settings from "../screens/Settings"
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
const Drawer = createDrawerNavigator()

const Navigation = () => {
  const access_token = useAppSelector((state) => state.user.user?.access_token)
  const role = useAppSelector((state) => state.user.user?.role)
  const shown = useAppSelector((state) => state.topBar.shown)

  const handlePress = (): void => {
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

  return (
    <NavigationContainer>
      {access_token == null ? (
        <HomeStack />
      ) : role === "passenger" ? (
        <Drawer.Navigator initialRouteName="passenger">
          <Drawer.Screen
            name="Passenger"
            component={Passenger}
            options={{ headerShown: shown ? true : false }}
          />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Weather" component={Weather} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator initialRouteName="driver">
          <Drawer.Screen
            name="Driver"
            component={Driver}
            options={{ headerShown: shown ? true : false }}
          />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigation
