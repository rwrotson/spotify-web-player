import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toPrevTrack } from "utils/fetch/spotifyAPI"
import { toPrevTrackDesktop } from "utils/fetch/spotifyDesktop"
import useSettingsParamsStore from "state/settingsParamsStore"
import Button from "components/ui/Button"

export default function PrevButton() {
  const fetchingMode = useSettingsParamsStore().getFetchingMode()

  const queryClient = useQueryClient()

  const { mutate: handlePrev, isPending } = useMutation({
    mutationKey: ["playbackMutation", "prev"],
    mutationFn:
      fetchingMode === "webApiOnly" ? toPrevTrack : toPrevTrackDesktop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback"] })
    },
  })

  return (
    <Button
      svgIcon="/images/prev.svg"
      id="PreviousButton"
      onClick={handlePrev}
      disabled={isPending}
    />
  )
}
