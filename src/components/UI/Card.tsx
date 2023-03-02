import React from "react"
import { StyleSheet, View } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: any
}

const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

export default Card
