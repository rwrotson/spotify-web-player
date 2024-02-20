import useMenuSelectorStore from "state/menuSelectorStore"
import Button from "components/ui/Button"

export default function SettingsButton() {
  const store = useMenuSelectorStore()

  const isPressed = store.state.isSettingsOpen

  const handleClick = async () => {
    store.toggleIsSettingsOpen()
  }

  return (
    <Button
      svgIcon="/images/settings.svg"
      id="SettingsButton"
      onClick={handleClick}
      isPressed={isPressed}
    />
  )
}
