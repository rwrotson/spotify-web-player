import InfoPanel from "components/PlaybackPanel/PlaybackPanel"
import NavPanel from "components/NavPanel/NavPanel"
import usePlaybackQuery from "hooks/spotify/usePlaybackQuery"
import useColorThemeQuery from "hooks/misc/useColorThemeQuery"
import QueuePanel from "components/QueuePanel/QueuePanel"
import SettingsPanel from "components/SettingsPanel/SettingsPanel"
import useMenuSelectorStore from "state/menuSelectorStore"

function useAppStyle(): React.CSSProperties {
  return {
    backgroundColor: useColorThemeQuery().dark,
  }
}

export default function App() {
  usePlaybackQuery()
  const { isQueueOpen, isSettingsOpen } = useMenuSelectorStore().state

  return (
    <div className="App" style={useAppStyle()}>
      <InfoPanel />
      <NavPanel />
      {isQueueOpen && <QueuePanel />}
      {isSettingsOpen && <SettingsPanel />}
    </div>
  )
}
