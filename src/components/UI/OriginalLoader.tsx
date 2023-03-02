import LottieView from "lottie-react-native"

const OriginalLoader = () => {
  return (
    <LottieView
      speed={5}
      style={{
        height: 30,
      }}
      source={{
        uri: "https://assets6.lottiefiles.com/packages/lf20_2tyhlsvz.json",
      }}
      autoPlay={true}
      loop={true}
    />
  )
}

export default OriginalLoader
