import axios from "axios"
import { AccessToken } from "types/types"
import { BACKEND_URL } from "types/consts"
import { callWithExponentialRetries } from "utils/fetch/helpers"
import useAccessTokenStore from "state/accessTokenStore"

const authBackend = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

function isTokenExpired(token: AccessToken): boolean {
  const currentTime = Math.ceil(Date.now() / 1000)
  return token.expiresAt <= currentTime
}

export async function getAccessToken(): Promise<string> {
  const storedAccessToken = useAccessTokenStore.getState().getAccessToken()

  if (!storedAccessToken) {
    const newAccessToken = await callWithExponentialRetries(getTokenFromBackend)
    useAccessTokenStore.getState().setAccessToken(newAccessToken)

    return newAccessToken.token
  }

  if (isTokenExpired(storedAccessToken)) {
    const newAccessToken = await callWithExponentialRetries(refreshAccessToken)
    useAccessTokenStore.getState().setAccessToken(newAccessToken)

    return newAccessToken.token
  }

  return storedAccessToken.token
}

async function getTokenFromBackend(): Promise<AccessToken> {
  try {
    const response = await authBackend.get("/auth/token")
    return {
      token: response.data.access_token,
      expiresAt: response.data.expires_at,
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 403) {
      return await refreshAccessToken()
    } else {
      throw e
    }
  }
}

async function refreshAccessToken(): Promise<AccessToken> {
  const response = await authBackend.get("/auth/refresh")
  return {
    token: response.data.access_token,
    expiresAt: response.data.expires_at,
  }
}
