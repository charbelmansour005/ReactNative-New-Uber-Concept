import { createSlice } from "@reduxjs/toolkit"

type initialStateType = {
  shown: boolean
}

const initialState: initialStateType = {
  // topBar enabled by default
  shown: true,
}

const topBarSlice = createSlice({
  name: "tooltip",
  initialState,
  reducers: {
    toggleTopBar: (state) => {
      state.shown = !state.shown
    },
  },
})

export const { toggleTopBar } = topBarSlice.actions

export default topBarSlice.reducer
