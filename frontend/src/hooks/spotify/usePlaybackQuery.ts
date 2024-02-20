import { useQuery, UseQueryResult, useQueryClient } from "@tanstack/react-query"
import { getLabel, getPlayback } from "utils/fetch/spotifyAPI"
import { getPlaybackDesktop } from "utils/fetch/spotifyDesktop"
import { Playback } from "types/types"
import useMenuSelectorStore from "state/menuSelectorStore"
import useSettingsParamsStore from "state/settingsParamsStore"

function useLabelQuery(albumId: string | undefined) {
  return useQuery({
    queryFn: async () => (albumId ? getLabel(albumId) : ""),
    queryKey: ["label", albumId],
    enabled: !!albumId,
  })
}

export default function usePlaybackQuery(): UseQueryResult<Playback> {
  const settingsStore = useSettingsParamsStore()
  const fetchingMode = settingsStore.getFetchingMode()

  const refetchInterval = settingsStore.state.refetchIntervals.playback
  const isFetchingOn = useMenuSelectorStore().state.isFetchingOn

  const prevQuery = useQueryClient().getQueryData<Playback>(["playback"])
  const prevTrackId = prevQuery?.track.id

  const playbackQueryResult = useQuery({
    queryFn: async () => {
      switch (fetchingMode) {
        case "webApiOnly":
          return await getPlayback()
        case "desktopOnly":
          return await getPlaybackDesktop()
        case "combined":
          const desktopResponse = await getPlaybackDesktop()
          if (desktopResponse.track.id !== prevTrackId) {
            return await getPlayback()
          } else {
            return desktopResponse
          }
        default:
          throw new Error("Invalid fetching mode")
      }
    },
    queryKey: ["playback"],
    enabled: isFetchingOn,
    refetchInterval: refetchInterval,
    refetchIntervalInBackground: true,
  })

  const albulmId = playbackQueryResult.data?.track.album.id
  const labelQueryResult = useLabelQuery(albulmId)

  if (playbackQueryResult.data && labelQueryResult.data) {
    playbackQueryResult.data.track.label = labelQueryResult.data
  }

  return playbackQueryResult
}
