import { StyleSheet, View } from "react-native"
import React from "react"
import { RadioButton } from "react-native-paper"
import { themeColors } from "../../config/themeColors"

interface FunctionProps {
  setRole: (args?: any) => any
}

interface RadioButtonRoleProps extends FunctionProps {
  role: string
}

const RadioButtonRole = ({ ...props }: RadioButtonRoleProps) => {
  return (
    <View style={{ marginTop: 10 }}>
      <RadioButton.Group
        onValueChange={(value) => props.setRole(value)}
        value={props.role}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RadioButton.Item
            label="I'm a Driver"
            value="driver"
            color={themeColors.googleBlue}
            labelVariant="bodySmall"
            position="leading"
          />
          <RadioButton.Item
            label="I'm a Passenger"
            value="passenger"
            color={themeColors.googleBlue}
            labelVariant="bodySmall"
            position="leading"
          />
        </View>
      </RadioButton.Group>
    </View>
  )
}

export default RadioButtonRole
