import { ColorReprString } from "utils/color/types/repr";


interface HEXColor {
	value: string
}


export function hexRepr(hexColor: HEXColor): ColorReprString {
	return "#" + hexColor.value;
}


export function printHex(hexColor: HEXColor): void {
	const repr = hexRepr(hexColor)
	console.log(`%c███`, `background-color: ${repr}; color: transparent;`);
}


export function parseHexRepr(hexColorRepr: ColorReprString): HEXColor {
    const hexRegex = /#[0-9A-Fa-f]{6}/
    if (!hexRegex.test(hexColorRepr)) {
		throw new Error('Unsupported color type');
	}

	const value = hexColorRepr.slice(1, hexColorRepr.length)

	return {value}
}


export default HEXColor