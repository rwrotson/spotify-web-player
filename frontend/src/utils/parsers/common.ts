export function trimPunctuation(inputString: string, regex: RegExp = /[^;.,-,/|\\]/): string {
	let [start, end] = [0, inputString.length - 1]

  	while (start < inputString.length && !regex.test(inputString[start])) start++;
	while (end >= 0 && !regex.test(inputString[end])) end--;
  	return inputString.substring(start, end + 1);
}	


export function deleteSubstring(inputString: string, substring: string | RegExp): string {
	return inputString.replace(substring, "")
}


export function deleteAfterSubstring(inputString: string, substring: string | RegExp): string {
    let index = -1

    if (substring instanceof RegExp) {
        index = inputString.search(substring)
    } else if (typeof substring === "string") {
        index = inputString.toLowerCase().indexOf(substring.toLowerCase())
    }

	if (index !== -1) {
		return inputString.substring(0, index)
	}
	return inputString
}


export function makeLengthSafe(inputString: string, length: number): string {
	if (inputString.length > length) {
		const deleteTrailingDots = (s: string) => s.replace(/\.*$/, '')
		const strWoLast3Chars = inputString.substring(0, length - 3)

		return deleteTrailingDots(strWoLast3Chars) + "..."
	}
	return inputString
}