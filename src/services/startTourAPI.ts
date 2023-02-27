import { instance } from "./api"

export const startTourAPI = async (startText: any, endText: any) => {
  try {
    const data = {
      startTime: startText,
      endTime: endText,
    }
    const response = await instance.post(`/tour`, data)
    return response
  } catch (error: any) {
    alert(error.message)
  }
}
