import { ColorReprString } from "utils/color/types/repr"


interface RGBColor {
	r: number
	g: number
	b: number
}


export function rgbRepr(rgbColor: RGBColor): ColorReprString {
	return `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
}


export function printRgb(rgbColor: RGBColor): void {
	const repr = rgbRepr(rgbColor)
	console.log(`%c███`, `background-color: ${repr}; color: transparent;`);
}


export function parseRgbRepr(rgbColorRepr: ColorReprString): RGBColor {
    const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/
    if (!rgbRegex.test(rgbColorRepr)) throw new Error('Unsupported color type');

	rgbColorRepr = rgbColorRepr.slice(4, rgbColorRepr.length - 1)
	const
		r = +rgbColorRepr.split(',')[0],
		g = +rgbColorRepr.split(',')[1],
		b = +rgbColorRepr.split(',')[2]

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('Unsupported color type');
    }

	return {r, g, b}
}


export default RGBColor