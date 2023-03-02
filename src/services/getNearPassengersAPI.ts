import { AxiosResponse, AxiosError } from "axios"
import { instance } from "./api"
// import { NearPassengers, CustomError } from "../types/getNearPassengerAPI.types"

interface NearPassengers {
  _id: string
  distanceInKiloMeter: number
  endTime: string
  startTime: string
}

interface CustomError {
  status?: number
  message: string
}

export const getNearPassengersAPI = async (): Promise<
  AxiosResponse<NearPassengers>
> => {
  try {
    const response = await instance.get<NearPassengers>(`/tour`)
    return response
  } catch (error) {
    // Only catch network errors
    if (error instanceof AxiosError) {
      throw {
        status: error.response?.status,
        message: error.message,
      } as CustomError
    }
    throw error
  }
}
