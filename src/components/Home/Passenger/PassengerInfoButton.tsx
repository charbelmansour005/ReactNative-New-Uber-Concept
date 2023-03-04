import { TouchableOpacity } from "react-native"
import React from "react"
import { useAppSelector } from "../../../redux/app/rtkHooks"
import { Feather } from "@expo/vector-icons"

type Props = {
  handleInfoOnPress: () => void
}

const PassengerInfoButton = ({ handleInfoOnPress }: Props) => {
  const passengerTour = useAppSelector((state) => state.passengertour)
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{ position: "absolute", right: 0 }}
        disabled={passengerTour.status === "loading"}
        onPress={handleInfoOnPress}
      >
        <Feather name="info" selectable={false} size={20} color={"gray"} />
      </TouchableOpacity>
    </React.Fragment>
  )
}

export default PassengerInfoButton
