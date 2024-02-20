import useGetLastPlaybackQuery from "hooks/spotify/useGetLastPlaybackQuery"
import CoverImage from "components/PlaybackPanel/TrackInfo/CoverImage"
import TitleField from "components/PlaybackPanel/TrackInfo/TitleField"
import ArtistsField from "components/PlaybackPanel/TrackInfo/ArtistsField"
import AlbumField from "components/PlaybackPanel/TrackInfo/AlbumField"
import LabelField from "components/PlaybackPanel/TrackInfo/LabelField"
import useColorThemeQuery from "hooks/misc/useColorThemeQuery"

function usePlaybackStyle(): React.CSSProperties {
  return {
    backgroundColor: useColorThemeQuery().light,
    color: useColorThemeQuery().ultralight,
  }
}

export default function PlaybackPanel(): JSX.Element {
  const playbackData = useGetLastPlaybackQuery()

  return (
    <div className="playback-pnl">
      <CoverImage albumArt={playbackData?.track?.album.coverUrl} />
      <div className="track-info" style={usePlaybackStyle()}>
        <TitleField title={playbackData?.track?.title} />
        <ArtistsField artists={playbackData?.track?.artists} />
        <div className="separator" />
        <AlbumField
          year={playbackData?.track?.album.year}
          albumTitle={playbackData?.track?.album.title}
        />
        <LabelField label={playbackData?.track?.label} />
      </div>
    </div>
  )
}
