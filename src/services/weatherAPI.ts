import axios from "axios"

interface WeatherResponse {
  main: {
    temp: number
    feels_like: number
  }
  weather: {
    description: string
  }[]
}

const API_KEY = "YOUR_API_KEY"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

export async function getCurrentWeather(
  city: string
): Promise<WeatherResponse> {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  const response = await axios.get(url)
  return response.data
}
