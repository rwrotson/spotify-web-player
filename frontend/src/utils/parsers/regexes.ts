const openingGroup = "[-\\[\\(]\\s*", //"[-\\[\\(]?\\s+",
  anyCharsGroup = "(.*?)", //"(?:.*)?",
  closingGroup = "[\\]\\)]?", //"[\\]\\)]?",
  featGroup = "(?:featuring|feat\\.|ft\\.|w\\/)",
  yearGroup = "\\d{4}",
  originalMixGroup = "original (?:mix|version|recording|release)/",
  remasterGroup =
    "(?:remaster|remastered|reissue|re-master|re-mastered|re-issue)",
  deluxeGroup = "(?:deluxe|expanded|super deluxe)",
  versionGroup = "(?:version|edition|edit|re-edit|mix|remix|reissue|re-issue)",
  scoreGroup = "(?:score|soundtrack)"

const featRegex = `${openingGroup}${featGroup}${anyCharsGroup}${closingGroup}`,
  remasterRegex = `${openingGroup}${yearGroup}${anyCharsGroup}${remasterGroup}${closingGroup}`,
  plainRemasterRegex = `${openingGroup}${remasterGroup}${closingGroup}`,
  originalMixRegex = `${openingGroup}${originalMixGroup}${closingGroup}`,
  deluxeRegex = `${openingGroup}${deluxeGroup}${anyCharsGroup}${closingGroup}`,
  versionRegex = `${openingGroup}${anyCharsGroup}${versionGroup}${closingGroup}`,
  scoreRegex = `${openingGroup}${anyCharsGroup}${scoreGroup}${closingGroup}`

export const regexes: Record<string, RegExp> = {
  feat: new RegExp(featRegex, "i"),
  remaster: new RegExp(remasterRegex, "i"),
  plainRemaster: new RegExp(plainRemasterRegex, "i"),
  originalMix: new RegExp(originalMixRegex, "i"),

  deluxe: new RegExp(deluxeRegex, "i"),
  version: new RegExp(versionRegex, "i"),
  score: new RegExp(scoreRegex, "i"),
}
