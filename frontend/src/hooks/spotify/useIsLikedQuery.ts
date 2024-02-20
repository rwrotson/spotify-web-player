import { useQuery } from "@tanstack/react-query"
import { isLiked } from "utils/fetch/spotifyAPI"
import useMenuSelectorStore from "state/menuSelectorStore"
import useSettingsParamsStore from "state/settingsParamsStore"

export default function useIsLikedQuery(trackId: string | undefined): boolean {
  const settingsStore = useSettingsParamsStore()

  const fetchingMode = settingsStore.getFetchingMode()
  const isFetchingOn = useMenuSelectorStore().state.isFetchingOn
  const refetchInterval = useSettingsParamsStore().state.refetchIntervals.like

  const queryResult = useQuery({
    queryFn: async () => (trackId ? await isLiked(trackId) : false),
    queryKey: ["isLiked", trackId],
    enabled: isFetchingOn && fetchingMode !== "desktopOnly" && !!trackId,
    refetchInterval: refetchInterval,
    refetchIntervalInBackground: true,
  })

  return queryResult.data === undefined ? false : queryResult.data
}
