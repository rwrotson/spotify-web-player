import { url } from "types/types"

const BACKEND_HOST = process.env.BACKEND_HOST
const BACKEND_PORT = process.env.BACKEND_PORT
export const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}` as url

const FRONTEND_HOST = process.env.FRONTEND_HOST
const FRONTEND_PORT = process.env.FRONTEND_PORT
export const FRONTEND_URL = `http://${FRONTEND_HOST}:${FRONTEND_PORT}` as url

export const SPOTIFY_API_URL = "https://api.spotify.com/v1" as url
export const DEFAULT_CONTEXT_TITLE_URL = "http://no.data.found" as url
