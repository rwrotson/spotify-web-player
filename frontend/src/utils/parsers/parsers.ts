import { regexes } from "utils/parsers/regexes"
import {
  deleteAfterSubstring,
  trimPunctuation,
  makeLengthSafe,
} from "utils/parsers/common"

export function parseTitle(trackTitle: string): string {
  const substringsToDelete: Array<string | RegExp> = [
    regexes.feat,
    regexes.remaster,
    regexes.plainRemaster,
    regexes.originalMix,
  ]

  for (let substring of substringsToDelete) {
    trackTitle = deleteAfterSubstring(trackTitle, substring).trim()
  }

  return makeLengthSafe(trackTitle, 60)
}

export function parseAlbumTitle(albumTitle: string): string {
  const substringsToDelete: Array<string | RegExp> = [
    regexes.feat,
    regexes.remaster,
    regexes.plainRemaster,
    regexes.originalMix,
    regexes.deluxe,
    regexes.version,
    regexes.score,
  ]

  for (let substring of substringsToDelete) {
    albumTitle = deleteAfterSubstring(albumTitle, substring).trim()
  }

  return makeLengthSafe(albumTitle, 60)
}

const substringsToDelete: string[] = [
  "under exclusive",
  "under licence",
  "this labelcopy information is the subject of copyright",
  "all rights reserved",
  "ltd",
  "trading as",
  "manufactured and marketed by",
  "manufactured by",
  "marketed by",
  "a division of",
  "issued under",
]

const copyrightMarks: string[] = ["©", "℗", "(C)", "(R)", "(P)"]

const commonEndings: string[] = [
  "records",
  "record",
  "recordings",
  "recording",
  "productions",
  "production",
  "publishing",
  "communications",
  "editions",
  "entertainment",
  "distribution",
  "catalogue",
  "company",
  "co",
  "group",
  "ltd",
  "ltda",
  "lda",
  "llp",
  "limited",
  "music",
  "llc",
  "inc",
  "ab",
  "gmbh",
  "s.a",
]

const currentYear: number = new Date().getFullYear() + 1

function cleanLabelInfo(label: string): string {
  for (const substring of substringsToDelete) {
    label = deleteAfterSubstring(label, substring).trim()
  }
  return label
}

function deleteCopyrightMark(splittedLabel: string[]): string[] {
  const firstWord = splittedLabel[0].toUpperCase()
  if (copyrightMarks.includes(firstWord)) {
    splittedLabel.shift()
  }

  return splittedLabel
}

function deleteYearMarks(splittedLabel: string[]): string[] {
  let firstWord = trimPunctuation(splittedLabel[0].toUpperCase())
  while (
    !isNaN(+firstWord) &&
    +firstWord <= currentYear &&
    +firstWord >= 1900
  ) {
    splittedLabel.shift()
    if (splittedLabel.length === 0) break

    firstWord = trimPunctuation(splittedLabel[0].toUpperCase())
  }

  return splittedLabel
}

function deleteCommonEndings(splittedLabel: string[]): string[] {
  let lastWord = trimPunctuation(
    splittedLabel[splittedLabel.length - 1].toLowerCase(),
  )
  while (commonEndings.includes(lastWord)) {
    splittedLabel.pop()
    if (splittedLabel.length === 0) break
    lastWord = trimPunctuation(
      splittedLabel[splittedLabel.length - 1].toLowerCase(),
    )
  }

  return splittedLabel
}

export function parseLabel(labelInfo: string): string {
  labelInfo = cleanLabelInfo(labelInfo)

  const labels = labelInfo.split(/[.,/|:\\]/)

  let formattedLabels = []
  for (let lbl of labels) {
    let splittedLabel = trimPunctuation(lbl).split(" ")

    if (splittedLabel.length) splittedLabel = deleteCopyrightMark(splittedLabel)
    if (splittedLabel.length) splittedLabel = deleteYearMarks(splittedLabel)
    if (splittedLabel.length) splittedLabel = deleteCommonEndings(splittedLabel)

    let formattedLabel = splittedLabel.join(" ")
    if (formattedLabel) formattedLabels.push(formattedLabel)
  }

  const formattedLabelsString = formattedLabels.join(" / ")
  if (!formattedLabelsString) return "..."

  return makeLengthSafe(formattedLabelsString, 40)
}
