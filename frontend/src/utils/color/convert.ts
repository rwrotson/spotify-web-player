import { RGBColor, HSLColor, HEXColor } from "utils/color/types/colors"


export function rbgToHsl({r, g, b}: RGBColor): HSLColor {
	let h, s, l

	r = r / 255
	g = g / 255
	b = b / 255

	const
		cMax = Math.max(r, g, b),
		cMin = Math.min(r, g, b),
		delta = cMax - cMin
	
	if (delta === 0) {
		h = 0
	} else if (cMax === r) {
		h = ((g - b) / delta) % 6
	} else if (cMax === g) {
		h = (b - r) / delta + 2
	} else {
		h = (r - g) / delta + 4
	}
		
	h = Math.round(h * 60)
	if (h < 0) h += 360

	l = (cMax + cMin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
		
	return {h, s, l}
}

export function rbgToHex(rgbColor: RGBColor): HEXColor {
	const channelToHex = (rgbChannelValue: number) : string => {
		const hex = rgbChannelValue.toString(16)
		return hex.length === 1 ? "0" + hex : hex
	}

	const value = [...Object.values(rgbColor)]
		.reduce((acc, color) => acc + channelToHex(color), '')
		.toUpperCase()

	return {value}
}


export function hslToRgb(hslColor: HSLColor): RGBColor {
	return hexToRgb(hslToHex(hslColor))
}


export function hslToHex({h, s, l}: HSLColor): HEXColor {
	l = l / 100

	const a = (s * Math.min(l, 1 - l)) / 100;

	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};

	const value = (f(0) + f(8) + f(4)).toUpperCase()

	return {value}
}


export function hexToRgb({value}: HEXColor): RGBColor {
	let bigint = parseInt(value, 16)

	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255,
	}
}


export function hexToHsl(hexColor: HEXColor): HSLColor {
	return rbgToHsl(hexToRgb(hexColor))
}