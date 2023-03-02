import { instance } from "./api"
import { AxiosError } from "axios"

interface CustomError {
  status?: number
  message: string
}

export const finishTourAPI = async (id: string | null) => {
  try {
    const response = await instance.delete(`/tour/${id}`)
    return response.data
    console.log(response)
  } catch (error) {
    // Only catch network errors
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
