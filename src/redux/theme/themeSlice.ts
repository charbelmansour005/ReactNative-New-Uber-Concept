import { createSlice } from "@reduxjs/toolkit"

interface initialState {
  darkTheme: boolean
}

const initialState: initialState = {
  darkTheme: false,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
