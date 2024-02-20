import { useQuery } from "@tanstack/react-query"
import { getNextTracksInQueue } from "utils/fetch/spotifyAPI"
import useMenuSelectorStore from "state/menuSelectorStore"
import useSettingsParamsStore from "state/settingsParamsStore"
import useGetLastPlaybackQuery from "hooks/spotify/useGetLastPlaybackQuery"

export default function useNextTrackQuery() {
  const settingsStore = useSettingsParamsStore()

  const fetchingMode = settingsStore.getFetchingMode()
  const refetchInterval = settingsStore.state.refetchIntervals.queue
  const isFetchingOn = useMenuSelectorStore().state.isFetchingOn

  const currentTrackId = useGetLastPlaybackQuery()?.track.id

  const queryResult = useQuery({
    queryFn: async () => await getNextTracksInQueue(),
    queryKey: ["nextPlayback", currentTrackId],
    refetchInterval: refetchInterval,
    refetchIntervalInBackground: true,
    enabled: isFetchingOn && fetchingMode !== "desktopOnly" && !!currentTrackId,
  })

  return queryResult
}
