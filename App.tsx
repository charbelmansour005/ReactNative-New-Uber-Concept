import "react-native-gesture-handler"
import { ToastProvider } from "react-native-toast-notifications"
import Navigation from "./src/navigation/Navigation"
import { Provider } from "react-redux"
import store from "./src/redux/app/store"
import { QueryClientProvider, QueryClient } from "react-query"
import { instance } from "./src/services/api"
import * as SecureStore from "expo-secure-store"

const queryClient = new QueryClient()

export default function App() {
  instance.defaults.headers.post["Content-Type"] = "application/json"

  instance.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  return (
    <ToastProvider successColor="#28a47c">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </Provider>
    </ToastProvider>
  )
}
