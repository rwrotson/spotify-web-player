import { ColorReprString } from "utils/color/types/repr"


interface HSLColor {
	h: number
	s: number
	l: number
}


export function hslRepr(hslColor: HSLColor): ColorReprString {
	return `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;
}


export function printHsl(hslColor: HSLColor): void {
	const repr = hslRepr(hslColor)
	console.log(`%c███`, `background-color: ${repr}; color: transparent;`);
}


export function parseHslRepr(hslColorRepr: ColorReprString): HSLColor {
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/
    if (!hslRegex.test(hslColorRepr)) {
		throw new Error('Unsupported color type');
	}

	hslColorRepr = hslColorRepr.slice(4, hslColorRepr.length - 1)
	const
		h = parseInt(hslColorRepr.split(',')[0]),
		s = parseFloat(hslColorRepr.split(',')[1]),
		l = parseFloat(hslColorRepr.split(',')[2])

    if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
		throw new Error('Unsupported color type')
	}

	return {h, s, l}
}


export default HSLColor