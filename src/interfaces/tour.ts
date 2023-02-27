export interface Tour {
  _id: string
  driver: any[]
  endTime: string
  startTime: string
  taken: boolean
}

export interface TourState {
  tours: Tour[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}
