import axios, { AxiosInstance, AxiosResponse } from "axios"
import { SPOTIFY_API_URL } from "types/consts"
import { Playback, Track, url } from "types/types"
import { parseTitle, parseAlbumTitle, parseLabel } from "utils/parsers/parsers"
import { getAccessToken } from "utils/fetch/auth"
import { ConnectionError, NotPlayingError } from "types/errors"

async function initializeSpotifyApi(): Promise<AxiosInstance> {
  const spotifyApi = axios.create({
    baseURL: SPOTIFY_API_URL,
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    responseType: "json",
  })

  spotifyApi.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${await getAccessToken()}`
      return config
    },
    (error) => Promise.reject(error),
  )

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

function parseTrack(data: Record<string, any>): Track {
  return {
    id: data?.id,
    title: parseTitle(data?.name),
    artists: data?.artists.map((artist: any): string => artist.name),
    album: {
      id: data?.album.id,
      title: parseAlbumTitle(data?.album.name),
      coverUrl: data?.album.images[1].url as url,
      year: parseInt(data?.album.release_date),
    },
  }
}

function parsePlayback(data: Record<string, any>): Playback {
  return {
    track: parseTrack(data.item),
    contextUrl: data?.context?.href as url,
    isPlaying: data?.is_playing,
  }
}

export async function getPlayback(): Promise<Playback> {
  const spotifyApi = await initializeSpotifyApi()

  try {
    const response = await spotifyApi.get("/me/player/currently-playing")
    return parsePlayback(response.data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new NotPlayingError("Spotify isn't playing on any of devices")
    }
    throw error
  }
}

export async function getContextTitle(contextUrl: url): Promise<string> {
  contextUrl = contextUrl.replace(SPOTIFY_API_URL, "")

  const userProfileUrls: Record<string, string> = {
    "/me/player": "my music",
    "/me/player/recently-played": "recently played",
    "/me/player/queue": "queue",
    "/me/player/tracks": "liked songs",
    "/me/player/albums": "saved albums",
    "/me/player/artists": "saved artists",
    "/me/player/playlists": "saved playlists",
    "/me/player/podcasts": "saved podcasts",
    "/me/top/tracks": "top tracks",
    "/me/top/artists": "top artists",
    "/me/tracks": "liked tracks",
  }
  if (contextUrl in userProfileUrls) return userProfileUrls[contextUrl]

  const spotifyApi = await initializeSpotifyApi()
  const response = await spotifyApi.get(contextUrl)
  return response.data.name
}

export async function getLabel(albumId: string): Promise<string> {
  const spotifyApi = await initializeSpotifyApi()
  const response = await spotifyApi.get(`/albums/${albumId}`)
  return response.data
    ? parseLabel(response.data.copyrights[0].text)
    : "unknown"
}

export async function getNextTracksInQueue(): Promise<Track[]> {
  const spotifyApi = await initializeSpotifyApi()
  const response = await spotifyApi.get("/me/player/queue")
  return response.data.queue.map((item: Record<string, string>) =>
    parseTrack(item),
  )
}

export async function isLiked(trackId: string): Promise<boolean> {
  const spotifyApi = await initializeSpotifyApi()
  const response = await spotifyApi.get(`/me/tracks/contains?ids=${trackId}`)
  return response.data[0]
}

export async function addLike(trackId: string): Promise<void> {
  const spotifyApi = await initializeSpotifyApi()
  await spotifyApi.put(`/me/tracks?ids=${trackId}`)
}

export async function removeLike(trackId: string): Promise<void> {
  const spotifyApi = await initializeSpotifyApi()
  await spotifyApi.delete(`/me/tracks?ids=${trackId}`)
}

export async function toNextTrack(numberOfCalls: number = 1): Promise<void> {
  const spotifyApi = await initializeSpotifyApi()
  Array.from(
    { length: numberOfCalls },
    async () => await spotifyApi.post("/me/player/next"),
  )
}

export async function toPrevTrack(): Promise<void> {
  const spotifyApi = await initializeSpotifyApi()
  await spotifyApi.post("/me/player/previous")
}

export async function play(): Promise<void> {
  const spotifyApi = await initializeSpotifyApi()
  await spotifyApi.put("/me/player/play")
}

export async function pause(): Promise<void> {
  const spotifyApi = await initializeSpotifyApi()
  await spotifyApi.put("/me/player/pause")
}
