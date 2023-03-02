import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { Card, Divider, Paragraph, Title } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { themeColors } from "../../../config/themeColors"
import { Feather } from "@expo/vector-icons"

type PassengerCardProps = {
  index: number
  startDate: string | any
  startTime: string | any
  endTime: string | any
  driver: any
  taken: boolean
}

const PassengerCard = ({ ...props }: PassengerCardProps) => {
  let driverName = "Unknown"
  let driverPhoneNumber = "Unknown"
  if (props.driver && props.driver.length > 0) {
    driverName = props.driver[0].name
    driverPhoneNumber = props.driver[0].phoneNumber
  }
  return (
    <React.Fragment>
      <Card mode="outlined" style={stylesPassengerCard.cardContainer}>
        <Card.Content>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title
              style={{
                color: props.taken ? themeColors.googleBlue : "orange",
                ...stylesPassengerCard.cardTitle,
              }}
            >
              Tour {props.index + 1}
            </Title>
            <Feather
              name={props.taken ? "check-circle" : "clock"}
              selectable={false}
              size={20}
              color={props.taken ? themeColors.googleBlue : "orange"}
            />
          </View>
          <Divider style={stylesPassengerCard.divider} />
          <View style={stylesPassengerCard.cardContent}>
            <Ionicons name="md-time" size={15} color="gray" />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              Start: {props.startDate} at {props.startTime}
            </Paragraph>
          </View>
          <View style={stylesPassengerCard.cardContent}>
            <Ionicons name="md-time" size={15} color="gray" />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              End: {props.endTime}
            </Paragraph>
          </View>
          <View style={stylesPassengerCard.cardContent}>
            <Ionicons
              name="md-car"
              size={15}
              color={props.taken ? themeColors.googleBlue : "orange"}
            />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              {props.taken ? "A driver booked your tour!" : "Pending"}
            </Paragraph>
          </View>
          <View style={stylesPassengerCard.cardContent}>
            <Ionicons
              name="person"
              size={15}
              color={props.taken ? themeColors.googleBlue : "orange"}
            />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              {driverName}
            </Paragraph>
          </View>
          <View style={stylesPassengerCard.cardContent}>
            <Ionicons
              name="ios-call"
              size={15}
              color={props.taken ? themeColors.googleBlue : "orange"}
            />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              {driverPhoneNumber}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

export default PassengerCard

const stylesPassengerCard = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "lightgray",
  },
  cardContainer: {
    marginVertical: "1%",
    marginHorizontal: "2%",
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 0,
    borderColor: themeColors.googleLightGray,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardContentText: {
    marginLeft: 8,
    fontSize: 14,
    color: "gray",
  },
  divider: {
    height: 1,
    marginVertical: 8,
    backgroundColor: "lightgray",
  },
})
