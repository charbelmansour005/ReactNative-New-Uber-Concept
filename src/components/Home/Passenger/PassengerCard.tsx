import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useToast } from "react-native-toast-notifications"
import React from "react"
import { Card, Divider, Paragraph, Title } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { themeColors } from "../../../config/themeColors"
import { Feather } from "@expo/vector-icons"
import { Durations } from "../../../helpers/durations"

type PassengerCardProps = {
  index: number
  startDate: string | any
  startTime: string | any
  endTime: string | any
  driver: any
  taken: boolean
}

const PassengerCard = ({ ...props }: PassengerCardProps) => {
  const toast = useToast()

  let driverName = "Unknown"
  let driverPhoneNumber = "Unknown"
  if (props.driver && props.driver.length > 0) {
    driverName = props.driver[0].name
    driverPhoneNumber = props.driver[0].phoneNumber
  }

  return (
    <React.Fragment>
      <Card mode="elevated" style={stylesPassengerCard.cardContainer}>
        <Card.Content>
          <View style={stylesPassengerCard.cardWrapper}>
            <Title
              style={{
                color: props.taken ? themeColors.googleBlue : "orange",
                ...stylesPassengerCard.cardTitle,
              }}
            >
              Tour {props.index + 1}
            </Title>
            <TouchableOpacity
              onPress={() =>
                toast.show(
                  `${
                    props.taken ? "Tour is booked!" : "Waiting for a driver."
                  }`,
                  {
                    duration: Durations.SHORT,
                    type: props.taken ? "success" : "warning",
                  }
                )
              }
            >
              <Feather
                name={props.taken ? "check" : "clock"}
                selectable={false}
                size={18}
                color={props.taken ? themeColors.googleBlue : "orange"}
              />
            </TouchableOpacity>
          </View>

          <Divider style={stylesPassengerCard.divider} />

          <View style={stylesPassengerCard.cardContent}>
            <Ionicons
              name="md-time"
              size={15}
              color={themeColors.googleGreen}
            />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              Starts at {props.startDate} at {props.startTime}
            </Paragraph>
          </View>

          <View style={stylesPassengerCard.cardContent}>
            <Ionicons name="md-time" size={15} color={themeColors.googleRed} />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              Ends at {props.endTime}
            </Paragraph>
          </View>

          <View style={stylesPassengerCard.cardContent}>
            <Ionicons
              name="md-car"
              size={15}
              color={props.taken ? themeColors.googleBlue : "orange"}
            />
            <Paragraph style={stylesPassengerCard.cardContentText}>
              {props.taken ? "Booked!" : "Pending"}
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
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardContentText: {
    marginLeft: 5,
    fontSize: 14,
    color: "gray",
  },
  divider: {
    height: 0.5,
    marginVertical: 8,
    backgroundColor: "lightgray",
  },
})
