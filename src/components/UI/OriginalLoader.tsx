import LottieView from "lottie-react-native"
import { View } from "react-native"
import LoaderGoogle from "../../assets/10043-loading-google-style.json"

const OriginalLoader = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <LottieView
        speed={1}
        style={{
          height: 100,
        }}
        source={LoaderGoogle}
        autoPlay={true}
        loop={true}
      />
    </View>
  )
}

export default OriginalLoader
