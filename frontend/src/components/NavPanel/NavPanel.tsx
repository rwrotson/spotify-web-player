import PrevButton from "components/NavPanel/PlaybackButtons/PrevButton"
import PlayPauseButton from "components/NavPanel/PlaybackButtons/PlayPauseButton"
import NextButton from "components/NavPanel/PlaybackButtons/NextButton"
import QueueButton from "components/NavPanel/PlaybackButtons/QueueButton"
import LikeButton from "components/NavPanel/ManagementButtons/LikeButton"
import SettingsButton from "components/NavPanel/ManagementButtons/SettingsButton"
import SwitchButton from "components/NavPanel/ManagementButtons/SwitchButton"
import ContextField from "components/NavPanel/NavInfo/ContextField"
import NextTrackField from "components/NavPanel/NavInfo/NextTrackField"
import useColorThemeQuery from "hooks/misc/useColorThemeQuery"

function useNavPanelStyle(): React.CSSProperties {
  return {
    backgroundColor: useColorThemeQuery().light,
    color: useColorThemeQuery().ultralight,
  }
}

export default function NavPanel(): JSX.Element {
  return (
    <div className="nav-pnl">
      <div className="nav-btn-group">
        <PrevButton />
        <PlayPauseButton />
        <NextButton />
        <QueueButton />
      </div>
      <div className="nav-info" style={useNavPanelStyle()}>
        <ContextField />
        <NextTrackField />
      </div>
      <div className="nav-btn-group">
        <LikeButton />
        <SettingsButton />
        <SwitchButton />
      </div>
    </div>
  )
}
