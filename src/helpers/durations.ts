import { z } from "zod"

const DurationSchema = z.object({
  SHORT: z.number(),
  MEDIUM: z.number(),
  LONG: z.number(),
})

type Duration = z.infer<typeof DurationSchema>

export const Durations: Duration = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 7000,
}
