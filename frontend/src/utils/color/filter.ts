import { HSLColor, hslRepr, parseHslRepr } from 'utils/color/types/colors'


interface HSLColorCount {
    element: HSLColor,
    occurrences: number
}


function countArray(hslArray: HSLColor[]) : HSLColorCount[] {
	const elementCounts = {} as Record<string, number>
	hslArray.forEach((element) => {
		const repr: string = hslRepr(element)
		elementCounts[repr] = (elementCounts[repr] || 0) + 1
	})

	return Object.entries(elementCounts).map(
        ([repr, occurrences]) => ({
		    element: parseHslRepr(repr),
		    occurrences,
	    })
    )
}


function sortCountedArray(countedArray: HSLColorCount[]) : HSLColorCount[] {
    return countedArray.sort((a, b) => {
        if (b.occurrences !== a.occurrences) {
            return b.occurrences - a.occurrences;
        }

        const coeff = (elem: HSLColorCount) => elem.element.s * 0.25 + elem.element.l * 0.75

        return coeff(b) - coeff(a);
    })
}


function getDominantHue(countedHslArray: HSLColorCount[]): number {
    const hueCounts = {} as Record<string, number>
    countedHslArray.forEach((element) => {
        const hueSector = Math.floor(element.element.h / 10)  // split hue into 36 sectors
        hueCounts[hueSector] = (hueCounts[hueSector] || 0) + element.occurrences
    })

    const hueWithMaxCount = Object.entries(hueCounts).reduce(
        (max, [hueSector, count]) => (count > max.count ? {hueSector, count} : max), 
        {hueSector: "", count: -1} as {hueSector: string, count: number}
    ).hueSector

    return +hueWithMaxCount
} 


function filterNotGreys(hslArray: HSLColor[]): HSLColor[] {
	return hslArray.filter((hslColor) => (
        hslColor.s > 5 && 
        hslColor.l > 10 &&
        hslColor.l < 90
    ))   
}


function filterDarkColors(sortedArray: HSLColorCount[]): HSLColorCount[] {
    return sortedArray.filter((element) => {
        return (element.element.l > 20 && element.element.s > 20)
    })
}


export function getThematicColor(hslArray: HSLColor[]): HSLColor {
    const filteredArray = filterNotGreys(hslArray)

    if (filteredArray.length === 0) {
        return {h: 0, s: 0, l: 0}
    }

    const countedArray = countArray(filteredArray)
    const sortedArray = sortCountedArray(countedArray)  
    const filteredSortedArray = filterDarkColors(sortedArray)

    if (filteredSortedArray.length === 0) {
        return sortedArray[0].element
    }

    const dominantHue = getDominantHue(sortedArray)
    for (const element of filteredSortedArray) {
        const hueSector = Math.floor(element.element.h / 10)
        if (hueSector === dominantHue) {
            return element.element
        }
    }

    return filteredSortedArray[0].element
}