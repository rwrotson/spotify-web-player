import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useGetLastPlaybackQuery from "hooks/spotify/useGetLastPlaybackQuery"
import { play, pause } from "utils/fetch/spotifyAPI"
import { playDesktop, pauseDesktop } from "utils/fetch/spotifyDesktop"
import useSettingsParamsStore from "state/settingsParamsStore"
import Button from "components/ui/Button"

export default function PlayPauseButton() {
  const fetchingMode = useSettingsParamsStore().getFetchingMode()

  const queryClient = useQueryClient()
  const isPlaying = useGetLastPlaybackQuery()?.isPlaying

  const playMutation = useMutation({
    mutationKey: ["playbackMutation", "play"],
    mutationFn: fetchingMode === "webApiOnly" ? play : playDesktop,
    onError: onError,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["playback"] })
      queryClient.cancelQueries({ queryKey: ["play"] })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["playback"] }),
  })

  const pauseMutation = useMutation({
    mutationKey: ["playbackMutation", "pause"],
    mutationFn: fetchingMode === "webApiOnly" ? pause : pauseDesktop,
    gcTime: 1000,
    onError: onError,
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey: ["playback"] })
      queryClient.cancelQueries({ queryKey: ["play"] })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["playback"] }),
  })

  function onError(error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // suppress accident duplicate click error
      return
    }
    throw error
  }

  return (
    <Button
      svgIcon={isPlaying ? "/images/pause.svg" : "/images/play.svg"}
      id={isPlaying ? "PauseButton" : "PlayButton"}
      onClick={isPlaying ? pauseMutation.mutate : playMutation.mutate}
      disabled={playMutation.isPending || pauseMutation.isPending}
    />
  )
}
