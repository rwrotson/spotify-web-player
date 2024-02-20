import { create } from "zustand"

export interface isLoading {
  playback: boolean
  other: boolean
}

type loadingStore = {
  state: isLoading
  getIsAnyLoading: () => boolean
  setLoading: (isLoading: boolean, type: keyof isLoading) => void
}

const useLoadingStore = create<loadingStore>((set, get) => ({
  state: {
    playback: false,
    other: false,
  },
  getIsAnyLoading: () => {
    const { playback, other } = get().state
    return playback || other
  },

  setLoading: (isLoading: boolean, type: keyof isLoading = "other") => {
    set({
      state: {
        ...get().state,
        [type]: isLoading,
      },
    })
  },
}))

export default useLoadingStore
