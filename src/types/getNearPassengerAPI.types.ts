export interface NearPassengers {
  _id: string
  distanceInKiloMeter: number
  endTime: string
  startTime: string
}

export interface CustomError {
  status?: number
  message: string
}
