import { TouchableOpacity } from "react-native"
import React from "react"
import { Feather } from "@expo/vector-icons"
import { useAppSelector } from "../../../redux/app/rtkHooks"

type Props = {
  handleChevronLongPress: () => void
  setIsShown: (args?: any) => void
  isShown: boolean
}

const PassenerChevronButton = ({
  handleChevronLongPress,
  setIsShown,
  isShown,
}: Props): JSX.Element => {
  const passengerTour = useAppSelector((state) => state.passengertour)
  return (
    <TouchableOpacity
      disabled={passengerTour.status === "loading"}
      onLongPress={handleChevronLongPress}
      onPress={() => setIsShown(!isShown)}
    >
      <Feather
        name={isShown ? "chevron-up" : "chevron-down"}
        selectable={false}
        size={20}
        color={"gray"}
        style={{
          marginRight: "5%",
        }}
      />
    </TouchableOpacity>
  )
}

export default PassenerChevronButton
