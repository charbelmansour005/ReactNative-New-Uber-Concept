import { instance } from "./api"
import { AxiosError } from "axios"
import { z } from "zod"

const CustomerErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
})

type CustomError = z.infer<typeof CustomerErrorSchema>

export const finishTourAPI = async (id: string | null) => {
  try {
    const response = await instance.delete(`/tour/${id}`)
    return response.data
    console.log(response)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error)
      throw {
        status: error.response?.status,
        message: error.message,
      } as CustomError
    }
    throw error
  }
}
