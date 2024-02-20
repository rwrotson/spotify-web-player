import { useQuery } from "@tanstack/react-query"
import { getContextTitle } from "utils/fetch/spotifyAPI"
import useSettingsParamsStore from "state/settingsParamsStore"
import { url } from "types/types"

export default function useContextTitleQuery(contextUrl: url | undefined) {
  const settingsStore = useSettingsParamsStore()
  const fetchingMode = settingsStore.getFetchingMode()

  const queryResult = useQuery({
    queryFn: async () => (contextUrl ? await getContextTitle(contextUrl) : ""),
    queryKey: ["contextTitle", contextUrl],
    enabled: fetchingMode !== "desktopOnly" && !!contextUrl,
  })

  return queryResult
}
