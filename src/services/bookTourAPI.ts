import { AxiosError } from "axios"
import { instance } from "./api"

interface CustomError {
  status?: number
  message: string
}

export const bookTourAPI = async (id: string | null) => {
  try {
    const response = await instance.put(`/tour/${id}`)
    return response.data
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
