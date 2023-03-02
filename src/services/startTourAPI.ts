import { instance } from "./api"

interface Payload {
  startTime: string | null
  endTime: string | null
}

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
  } catch (error: any) {
    alert(error.message)
  }
}
