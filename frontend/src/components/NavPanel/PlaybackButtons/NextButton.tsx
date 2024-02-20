import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toNextTrack } from "utils/fetch/spotifyAPI"
import { toNextTrackDesktop } from "utils/fetch/spotifyDesktop"
import useSettingsParamsStore from "state/settingsParamsStore"
import Button from "components/ui/Button"

export default function NextButton() {
  const fetchingMode = useSettingsParamsStore().getFetchingMode()

  const queryClient = useQueryClient()

  const { mutate: handleNext, isPending } = useMutation({
    mutationKey: ["playbackMutation", "next"],
    mutationFn:
      fetchingMode === "webApiOnly" ? toNextTrack : toNextTrackDesktop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback"] })
    },
  })

  return (
    <Button
      svgIcon="/images/next.svg"
      id="NextButton"
      onClick={handleNext}
      disabled={isPending}
    />
  )
}
