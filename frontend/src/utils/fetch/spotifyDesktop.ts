import axios, { AxiosInstance, AxiosResponse } from "axios"
import { Playback, url } from "types/types"
import { parseTitle, parseAlbumTitle } from "utils/parsers/parsers"
import { BACKEND_URL } from "types/consts"
import { ConnectionError } from "types/errors"

async function initializeDesktopApi(): Promise<AxiosInstance> {
  const spotifyApi = axios.create({
    baseURL: `${BACKEND_URL}/desktop`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    responseType: "json",
  })

  spotifyApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        throw new ConnectionError("Request timeout")
      }
      return Promise.reject(error)
    },
  )

  return spotifyApi
}

function parsePlaybackDesktop(data: Record<string, any>): Playback {
  return {
    track: {
      id: data?.trackId,
      title: parseTitle(data?.title),
      artists: data?.artists,
      album: {
        title: parseAlbumTitle(data?.albumTitle),
        coverUrl: data?.artworkUrl as url,
      },
    },
    isPlaying: data?.isPlaying,
  }
}

export async function getPlaybackDesktop(): Promise<Playback> {
  const desktopBackend = await initializeDesktopApi()
  const response = await desktopBackend.get("/playback")
  return parsePlaybackDesktop(response.data)
}

export async function toNextTrackDesktop(): Promise<void> {
  const desktopBackend = await initializeDesktopApi()
  await desktopBackend.post("/next")
}

export async function toPrevTrackDesktop(): Promise<void> {
  const desktopBackend = await initializeDesktopApi()
  await desktopBackend.post("/previous")
}

export async function playDesktop(): Promise<void> {
  const desktopBackend = await initializeDesktopApi()
  await desktopBackend.post("/play")
}

export async function pauseDesktop(): Promise<void> {
  const desktopBackend = await initializeDesktopApi()
  await desktopBackend.post("/pause")
}
