import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { useAppSelector } from "../redux/app/rtkHooks"
import Homestack from "./HomeStack"
import PassengerStack from "./PassengerStack"
import DriverStack from "./Driverstack"

export type RootStackParamList = {
  Landing: undefined
  Welcome: undefined
  SignUp: undefined
  Login: undefined
  Driver: undefined
  Passenger: undefined
  Intro: undefined
}

const Navigation = () => {
  const access_token = useAppSelector((state) => state.user.user?.access_token)
  const role = useAppSelector((state) => state.user.user?.role)

  return (
    <NavigationContainer>
      {access_token == null ? (
        <Homestack />
      ) : role === "passenger" ? (
        <PassengerStack />
      ) : (
        <DriverStack />
      )}
    </NavigationContainer>
  )
}

export default Navigation
