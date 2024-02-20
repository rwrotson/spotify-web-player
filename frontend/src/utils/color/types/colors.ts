import { ColorReprString } from "utils/color/types/repr";
import RGBColor, { rgbRepr, parseRgbRepr, printRgb } from "utils/color/types/rgb";
import HSLColor, { hslRepr, parseHslRepr, printHsl } from "utils/color/types/hsl";
import HEXColor, { hexRepr, parseHexRepr, printHex } from "utils/color/types/hex";


type Color = RGBColor | HSLColor | HEXColor


function isRGBColor(color: Color): color is RGBColor {
	return 'r' in color && 'g' in color && 'b' in color;
}

function isHSLColor(color: Color): color is HSLColor {
	return 'h' in color && 's' in color && 'l' in color;
}

function isHEXColor(color: Color): color is HEXColor {
	return 'value' in color;
}


enum ColorType {
	RGB = 'rgb',
	HSL = 'hsl',
	HEX = 'hex'
}


function defineColorType(color: Color): ColorType {
	if (isRGBColor(color)) {
		return ColorType.RGB
	} else if (isHSLColor(color)) {
		return ColorType.HSL
	} else if (isHEXColor(color)) {
		return ColorType.HEX
	} else {
		throw new Error('Unsupported color type');
	}
}


function colorRepr(color: Color): ColorReprString {
    switch (defineColorType(color)) {
        case "rgb": return rgbRepr(color as RGBColor);
        case "hsl": return hslRepr(color as HSLColor)
        case "hex": return hexRepr(color as HEXColor)
        
        default: throw new Error('Unsupported color type');
    }
}


function printColor(color: Color): void {
    switch (defineColorType(color)) {
        case "rgb": printRgb(color as RGBColor); break;
        case "hsl": printHsl(color as HSLColor); break;
        case "hex": printHex(color as HEXColor); break;

        default: throw new Error('Unsupported color type');
    }
}


function parseColorRepr(colorRepr: ColorReprString): Color {
    switch (colorRepr.slice(0, 3)) {
        case "rgb": return parseRgbRepr(colorRepr)
        case "hsl": return parseHslRepr(colorRepr)
        case "#": return parseHexRepr(colorRepr)

        default: throw new Error('Unsupported color type');
    }
}


export type {
    ColorReprString,
    RGBColor, 
    HSLColor,
    HEXColor,
    Color,
}


export {
    rgbRepr,
    hslRepr,
    hexRepr,
    colorRepr,
    parseRgbRepr,
    parseHslRepr,
    parseHexRepr,
    parseColorRepr,
    printRgb,
    printHsl,
    printHex,
    printColor,
}