import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, UserState } from "../../interfaces/user"

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    setName(state, action: PayloadAction<any>) {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
