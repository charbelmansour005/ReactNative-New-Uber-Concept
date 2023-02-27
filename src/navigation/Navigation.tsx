import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { IconButton } from "react-native-paper"
import { Linking } from "react-native"
import { useAppSelector } from "../redux/app/rtkHooks"
import { themeColors } from "../config/themeColors"

// all screens
import Landing from "../screens/Landing"
import Welcome from "../screens/Welcome"
import SignUp from "../screens/SignUp"
import Login from "../screens/Login/Login"
import Driver from "../screens/Driver"
import Passenger from "../screens/Passenger"

export type RootStackParamList = {
  Landing: undefined
  Welcome: undefined
  SignUp: undefined
  Login: undefined
  Driver: undefined
  Passenger: undefined
}

export const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  const user = useAppSelector((state) => state?.user)

  const handlePress = () => {
    Linking.openURL("https://www.google.com/maps/")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {user.user?.access_token == null ? (
          <>
            {/* unauthenticated stack */}
            <Stack.Screen name="Welcome" component={Welcome} />
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
                title: "Log In",
                headerShown: true,
                gestureDirection: "horizontal",
                animation: "slide_from_right",
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
          </>
        ) : (
          // authenticated stack
          <React.Fragment>
            {user.user?.role === "passenger" ? (
              <Stack.Screen name="Passenger" component={Passenger} />
            ) : (
              <Stack.Screen name="Driver" component={Driver} />
            )}
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
