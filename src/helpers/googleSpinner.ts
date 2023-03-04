import { themeColors } from "../config/themeColors"

const googleColors: string[] = [
  themeColors.googleBlue,
  themeColors.googleGreen,
  themeColors.googleRed,
  themeColors.googleYellow,
]

const randomSpinnerColor = googleColors[Math.floor(Math.random() * 4)]
export const chosenSpinnerColor: string = randomSpinnerColor
