import { create } from "zustand"
import { AccessToken } from "types/types"

type AccessTokenStore = {
  state: AccessToken | null
  getAccessToken: () => AccessToken | null
  setAccessToken: (accessToken: AccessToken) => void
}

const useAccessTokenStore = create<AccessTokenStore>((set, get) => ({
  state: null,
  getAccessToken: () => get().state,
  setAccessToken: (accessToken: AccessToken) => {
    set({
      state: accessToken,
    })
  },
}))

export default useAccessTokenStore
