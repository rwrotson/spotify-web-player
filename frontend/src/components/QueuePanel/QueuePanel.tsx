import useNextTracksQuery from "hooks/spotify/useNextTrackQuery"
import QueueItem from "components/QueuePanel/QueueItem"
import useColorStyleQuery from "hooks/misc/useColorThemeQuery"
import useSettingParamsStore from "state/settingsParamsStore"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toNextTrack } from "utils/fetch/spotifyAPI"
import useUpdateErrors from "hooks/helpers/useUpdateErrors"

function useQueueNav() {
  const isQueueNavAllowed = useSettingParamsStore().getIsQueueNavAllowed()
  const queryClient = useQueryClient()

  const mutationResult = useMutation({
    mutationKey: ["playbackMutation", "nextSkip"],
    mutationFn: async (order: number) => {
      if (isQueueNavAllowed) {
        return await toNextTrack(order)
      }
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["playback"] })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["playback"] })
    },
  })

  useUpdateErrors(mutationResult.error)

  return mutationResult
}

function useQueueStyle(): React.CSSProperties {
  return {
    backgroundColor: useColorStyleQuery().dark,
  }
}

export default function QueuePanel() {
  const { mutate: handleClick } = useQueueNav()
  const nextTracks = useNextTracksQuery()?.data?.slice(0, 6)

  return (
    <div className="queue-pnl" style={useQueueStyle()}>
      {nextTracks?.map((track, index) => (
        <QueueItem
          track={track}
          order={index + 1}
          onClick={handleClick}
          key={track.id}
        />
      ))}
    </div>
  )
}
