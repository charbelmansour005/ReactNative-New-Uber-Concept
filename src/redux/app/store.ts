import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "../login/loginSlice"
import tourReducer from "../passenger/tour/tourSlice"
import topBarReducer from "../passenger/topBarSlice"
import themeReducer from "../theme/themeSlice"

const rootReducer = combineReducers({
  user: userReducer,
  passengertour: tourReducer,
  topBar: topBarReducer,
  theme: themeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
})

export default store
