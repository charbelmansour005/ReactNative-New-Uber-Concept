const screenAnimations: string[] = [
  "fade_from_bottom",
  "slide_from_bottom",
  "slide_from_right",
  "slide_from_left",
  "simple_push",
  "flip",
  "fade",
]

const randomScreenAnimation = screenAnimations[Math.floor(Math.random() * 7)]
export const chosenScreenAnimation: any = randomScreenAnimation
