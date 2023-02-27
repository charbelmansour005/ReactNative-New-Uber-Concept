import axios, { AxiosInstance } from "axios"
import { BASE_URL } from "../config/url"
import * as SecureStore from "expo-secure-store"
const baseURL = BASE_URL

export const instance: AxiosInstance = axios.create({
  baseURL,
  responseType: "json",
})
