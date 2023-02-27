import { StyleSheet, View } from "react-native"
import React from "react"
import { RadioButton } from "react-native-paper"
import { themeColors } from "../../config/themeColors"

interface FunctionProps {
  setRole: (args?: any) => void
}

interface RadioButtonRoleProps extends FunctionProps {
  role: any
}

const RadioButtonRole = ({ ...props }: RadioButtonRoleProps) => {
  return (
    <View style={{ marginTop: 10 }}>
      <RadioButton.Group
        onValueChange={(value) => props.setRole(value)}
        value={props.role}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <RadioButton.Item
            label="I'm a Driver"
            value="driver"
            color={themeColors.googleGreen}
            labelVariant="bodyMedium"
          />
          <RadioButton.Item
            label="I'm a Passenger"
            value="passenger"
            color={themeColors.googleGreen}
            labelVariant="bodyMedium"
          />
        </View>
      </RadioButton.Group>
    </View>
  )
}

export default RadioButtonRole
