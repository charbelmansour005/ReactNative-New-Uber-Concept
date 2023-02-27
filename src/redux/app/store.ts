import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "../login/loginSlice"
import tourReducer from "../passenger/tour/tourSlice"

const rootReducer = combineReducers({
  user: userReducer,
  passengertour: tourReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
})

export default store
