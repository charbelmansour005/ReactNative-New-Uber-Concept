import axios, { AxiosInstance } from "axios"
import { BASE_URL } from "../config/url"
const baseURL = BASE_URL

export const instance: AxiosInstance = axios.create({
  baseURL,
  responseType: "json",
})

export const signUpURL = "/auth/signup"

export const signinUrl = "/auth/signin"

export const roleURL = "/auth/whoami"
