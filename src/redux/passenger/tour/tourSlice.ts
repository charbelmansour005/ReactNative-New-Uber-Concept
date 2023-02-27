import * as SecureStore from "expo-secure-store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { instance } from "../../../services/api"
import { Tour, TourState } from "../../../interfaces/tour"

export const fetchTours = createAsyncThunk<
  Tour[],
  void,
  {
    rejectValue: { errorMessage: string }
  }
>("passenger/fetchTours", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<Tour[]> = await instance.get(
      `/tour/passenger`
    )
    return response.data
  } catch (err: any) {
    return rejectWithValue({ errorMessage: err.response.data })
  }
})

const initialState: TourState = {
  tours: [],
  status: "idle",
  error: null,
}

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tours = action.payload
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload?.errorMessage ?? "Something went wrong"
      })
  },
})

export const {} = tourSlice.actions
export default tourSlice.reducer
