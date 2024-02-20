import { ColorReprString } from "utils/color/types/repr"

export interface AccessToken {
  token: string
  expiresAt: number
}

export type url = string

export interface Playback {
  track: Track

  contextUrl?: url
  isPlaying: boolean
}

export interface Track {
  id: string
  title: string
  artists: string[] | string
  album: Album
  label?: string
  isLiked?: boolean
}

export interface Album {
  id?: string
  title: string
  coverUrl: url
  year?: number
}

export interface ColorTheme {
  ultralight: ColorReprString
  light: ColorReprString
  dark: ColorReprString
}
