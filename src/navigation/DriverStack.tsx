import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Driver, Settings } from "../screens"
import { useAppSelector } from "../redux/app/rtkHooks"

const Drawer = createDrawerNavigator()
export default function DriverStack() {
  const shown = useAppSelector((state) => state.topBar.shown)
  return (
    <>
      <Drawer.Navigator initialRouteName="driver">
        <Drawer.Screen
          name="Driver"
          component={Driver}
          options={{ headerShown: shown ? true : false }}
        />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </>
  )
}
