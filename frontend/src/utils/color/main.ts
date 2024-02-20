import { hslRepr } from "utils/color/types/colors"
import { ColorTheme } from "types/types"
import { rbgToHsl } from "utils/color/convert"
import { getThematicColor } from "utils/color/filter"
import { buildRgbArray, quantizeRgbArray } from "utils/color/extract"

async function getColorTheme(
  imgElementId: string = "CoverImage",
): Promise<ColorTheme> {
  const imgElement = document.getElementById(imgElementId) as HTMLImageElement
  const image = new Image()
  if (imgElement) {
    image.src = imgElement.src
    image.crossOrigin = "anonymous"
  }

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height

      const context = canvas.getContext("2d")
      if (!context) {
        reject("Could not get canvas context")
        return
      }

      context.drawImage(image, 0, 0)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      const rgbArray = buildRgbArray(imageData.data)
      const quantizedColors = quantizeRgbArray(rgbArray, 0).map((rgbColor) =>
        rbgToHsl(rgbColor),
      )
      const thematicColor = getThematicColor(quantizedColors)

      const colorTheme: ColorTheme = {
        ultralight: hslRepr({
          h: thematicColor.h,
          s: thematicColor.s,
          l: 92.5,
        }),
        light: hslRepr({ h: thematicColor.h, s: thematicColor.s, l: 14.0 }),
        dark: hslRepr({ h: thematicColor.h, s: thematicColor.s, l: 7.5 }),
      }

      resolve(colorTheme)
    }

    image.onerror = (error) => {
      reject(error)
    }
  })
}

export default getColorTheme
