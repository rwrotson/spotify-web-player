import useNextTracksQuery from "hooks/spotify/useNextTrackQuery"
import { makeLengthSafe } from "utils/parsers/common"

function formatNextTrack(artists: string[] | string, title: string): string {
  const formattedTitle = title.length < 15 ? title : ""

  const formattedArtists =
    typeof artists === "object"
      ? artists.join(", ").length + formattedTitle.length < 35 // case string[]
        ? artists.join(", ")
        : `${artists[0]}..`
      : artists.length + formattedTitle.length < 35 // case string
        ? artists
        : ""

  const formattedNextPlayback = formattedTitle
    ? `${formattedArtists} - ${formattedTitle}`
    : formattedArtists

  if (formattedArtists.length + title.length <= 32) {
    return makeLengthSafe(`${formattedArtists} - ${title}`, 32)
  }

  return makeLengthSafe(formattedNextPlayback, 30)
}

export default function NextTrackField(): JSX.Element {
  const nextTracks = useNextTracksQuery().data
  const nextTrack = nextTracks && nextTracks.length ? nextTracks[0] : undefined

  const artists = nextTrack?.artists
  const title = nextTrack?.title

  return (
    <span>
      <b>
        {artists?.length && title
          ? ">> " + formatNextTrack(artists, title)
          : ""}
      </b>
    </span>
  )
}
