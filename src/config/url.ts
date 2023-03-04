import { z } from "zod"

const URLSchema = z.string().url()

type URL = z.infer<typeof URLSchema>

export const BASE_URL: URL = "http://192.168.1.69:3000"

// export const BASE_URL: URL = "http://192.168.231.191:3000"
