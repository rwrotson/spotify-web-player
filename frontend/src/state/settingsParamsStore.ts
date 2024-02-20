import { create } from "zustand"
import { z } from "zod"

export const settingsParamsSchema = z.object({
  refetchIntervals: z
    .object({
      playback: z.coerce
        .number()
        .int()
        .min(500)
        .max(10 * 1000)
        .default(1000),
      queue: z.coerce
        .number()
        .int()
        .min(1000)
        .max(10 * 60 * 1000)
        .default(30 * 1000),
      like: z.coerce
        .number()
        .int()
        .min(1000)
        .max(10 * 60 * 1000)
        .default(30 * 1000),
    })
    .default({}),
  options: z
    .object({
      allowQueueNavigation: z.boolean().default(true),
      allowSpotifyWebApi: z.boolean().default(true),
      allowSpotifyDesktop: z.boolean().default(false),
    })
    .default({}),
})

export type SettingsParams = z.infer<typeof settingsParamsSchema>

function getSettingsFromLocalStorage(): SettingsParams | null {
  const settingsJSON = localStorage.getItem("spotifyPlayerSettings")
  return settingsJSON
    ? settingsParamsSchema.parse(JSON.parse(settingsJSON))
    : null
}

function setSettingsToLocalStorage(newState: SettingsParams): void {
  const settingsJSON = JSON.stringify(settingsParamsSchema.parse(newState))
  localStorage.setItem("spotifyPlayerSettings", settingsJSON)
}

type SettingsParamsStore = {
  state: SettingsParams

  getPlaybackInterval: () => number
  getQueueInterval: () => number
  getLikeInterval: () => number
  getIsQueueNavAllowed: () => boolean
  getFetchingMode: () => "desktopOnly" | "webApiOnly" | "combined"

  setSettings: (newState: SettingsParams) => void
}

const useSettingsParamsStore = create<SettingsParamsStore>((set, get) => ({
  state: getSettingsFromLocalStorage() || settingsParamsSchema.parse({}),

  getPlaybackInterval: () => get().state.refetchIntervals.playback,
  getQueueInterval: () => get().state.refetchIntervals.queue,
  getLikeInterval: () => get().state.refetchIntervals.like,
  getIsQueueNavAllowed: () => get().state.options.allowQueueNavigation,
  getFetchingMode: () => {
    const allowWebApi = get().state.options.allowSpotifyWebApi
    const allowDesktop = get().state.options.allowSpotifyDesktop

    if (allowWebApi && !allowDesktop) {
      return "webApiOnly"
    } else if (allowDesktop && !allowWebApi) {
      return "desktopOnly"
    } else {
      return "combined"
    }
  },

  setSettings: (newState: SettingsParams) => {
    set({ state: settingsParamsSchema.parse(newState) })
    setSettingsToLocalStorage(newState)
  },
}))

export default useSettingsParamsStore
