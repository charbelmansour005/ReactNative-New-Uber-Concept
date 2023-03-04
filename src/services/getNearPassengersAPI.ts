import { AxiosResponse, AxiosError } from "axios"
import { instance } from "./api"
import { z } from "zod"

const CustomerErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
})

type CustomError = z.infer<typeof CustomerErrorSchema>

interface NearPassengers {
  _id: string
  distanceInKiloMeter: number
  endTime: string
  startTime: string
}

export const getNearPassengersAPI = async (): Promise<
  AxiosResponse<NearPassengers>
> => {
  try {
    const response = await instance.get<NearPassengers>(`/tour`)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        status: error.response?.status,
        message: error.message,
      } as CustomError
    }
    throw error
  }
}
