import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Passenger, Settings, Weather } from "../screens"
import { useAppSelector } from "../redux/app/rtkHooks"

const Drawer = createDrawerNavigator()
export default function PassengerStack() {
  const shown = useAppSelector((state) => state.topBar.shown)
  return (
    <>
      <Drawer.Navigator initialRouteName="passenger">
        <Drawer.Screen
          name="Passenger"
          component={Passenger}
          options={{ headerShown: shown ? true : false }}
        />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Weather" component={Weather} />
      </Drawer.Navigator>
    </>
  )
}
