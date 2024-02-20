import { Track } from "types/types"
import useColorThemeQuery from "hooks/misc/useColorThemeQuery"
import useSettingParamsStore from "state/settingsParamsStore"

function useTextStyle(): React.CSSProperties {
  return {
    color: useColorThemeQuery().ultralight,
  }
}

function useCardStyle(isQueueNavEnabled: boolean): React.CSSProperties {
  return {
    backgroundColor: useColorThemeQuery().light,
    cursor: isQueueNavEnabled ? "pointer" : "default",
  }
}

interface QueueItemProps {
  track: Track
  order: number
  onClick: (order: number) => void
}

export default function QueueItem({ track, order, onClick }: QueueItemProps) {
  const isQueueNavEnabled = useSettingParamsStore().getIsQueueNavAllowed()

  const artists = Array.isArray(track.artists)
    ? track.artists.join(", ")
    : track.artists

  return (
    <div
      className={"queue-item" + (isQueueNavEnabled ? " selectable" : "")}
      style={useCardStyle(isQueueNavEnabled)}
      onClick={() => onClick(order)}
    >
      <div className={"queue-item-fld"} style={useTextStyle()}>
        {artists} - <b>{track.title}</b> <i>({track.album.year})</i>
      </div>
    </div>
  )
}
