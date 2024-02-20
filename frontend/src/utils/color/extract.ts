import { RGBColor } from "utils/color/types/colors";


export function buildRgbArray(imageData: Uint8ClampedArray) : RGBColor[] {
    const rgbValues = []

    // looping every 4 for every Red, Green, Blue and Alpha
    for (let i = 0; i < imageData.length; i += 4) {
      const rgb = {r: imageData[i], g: imageData[i + 1], b: imageData[i + 2]} as RGBColor
      rgbValues.push(rgb)
    }
  
    return rgbValues
};


enum ColorChannel {
    Red = "r",
    Green = "g",
    Blue = "b"
}


function findBiggestColorRange(rgbArray: RGBColor[]): ColorChannel {
    let 
        rMin = Number.MAX_VALUE,
        gMin = Number.MAX_VALUE,
        bMin = Number.MAX_VALUE,
        rMax = Number.MIN_VALUE,
        gMax = Number.MIN_VALUE,
        bMax = Number.MIN_VALUE
  
    rgbArray.forEach((rgbColor) => {
        rMin = Math.min(rMin, rgbColor.r);
        gMin = Math.min(gMin, rgbColor.g);
        bMin = Math.min(bMin, rgbColor.b);
        rMax = Math.max(rMax, rgbColor.r);
        gMax = Math.max(gMax, rgbColor.g);
        bMax = Math.max(bMax, rgbColor.b);
    })
  
    const 
        rRange = rMax - rMin,
        gRange = gMax - gMin,
        bRange = bMax - bMin
  
    switch (Math.max(rRange, gRange, bRange)) {
        case rRange:
            return ColorChannel.Red;
        case gRange:
            return ColorChannel.Green;
        default:
            return ColorChannel.Blue;
    }
}


export function quantizeRgbArray(rgbArray: RGBColor[], depth: number = 0) : RGBColor[]{
    const MAX_DEPTH = 4;
  
    // Base case
    if (depth === MAX_DEPTH || rgbArray.length === 0) {
		const rgbColor = rgbArray.reduce((prev, curr) => {
          	prev.r += curr.r;
          	prev.g += curr.g;
          	prev.b += curr.b;

          	return {r: prev.r, g: prev.g, b: prev.b}
        },
        {r: 0, g: 0, b: 0})
		for (const channel of Object.keys(rgbColor) as (keyof RGBColor)[]) {
			rgbColor[channel] = Math.round(rgbColor[channel] / rgbArray.length)
		}
	
		return [rgbColor]
    }
  
    /**
     *  Recursively do the following:
     *  1. Find the pixel channel (red,green or blue) with biggest difference/range
     *  2. Order by this channel
     *  3. Divide in half the rgb colors list
     *  4. Repeat process again, until desired depth or base case
     */
    const componentToSortBy = findBiggestColorRange(rgbArray)
    rgbArray.sort((p1, p2) => p1[componentToSortBy] - p2[componentToSortBy])
  
    return [
      	...quantizeRgbArray(rgbArray.slice(0, rgbArray.length / 2), depth + 1),
      	...quantizeRgbArray(rgbArray.slice(rgbArray.length / 2 + 1), depth + 1),
    ]
}