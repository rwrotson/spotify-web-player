import useGetLastPlaybackQuery from "hooks/spotify/useGetLastPlaybackQuery"
import useContextTitleQuery from "hooks/spotify/useContextTitleQuery"
import { makeLengthSafe } from "utils/parsers/common"

function formatContextTitle(contextTitle: string): string {
  return makeLengthSafe(contextTitle, 32)
}

export default function ContextField(): JSX.Element {
  const playbackData = useGetLastPlaybackQuery()

  const contextTitle = useContextTitleQuery(playbackData?.contextUrl).data
  return (
    <span>
      <b>{contextTitle ? "@ " + formatContextTitle(contextTitle) : ""}</b>
    </span>
  )
}
