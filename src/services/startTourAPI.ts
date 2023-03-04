import { instance } from "./api"
import { AxiosError } from "axios"
import { z } from "zod"

const CustomerErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
})

type CustomError = z.infer<typeof CustomerErrorSchema>

const PayloadSchema = z.object({
  startTime: z.string().nullish(),
  endTime: z.string().nullish(),
})

type Payload = z.infer<typeof PayloadSchema>

export const startTourAPI = async (
  startText: string | null,
  endText: string | null
) => {
  try {
    const data: Payload = {
      startTime: startText,
      endTime: endText,
    }
    const response = await instance.post(`/tour`, data)
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
