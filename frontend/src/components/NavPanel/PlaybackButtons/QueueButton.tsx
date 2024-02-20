import useMenuSelectorStore from "state/menuSelectorStore"
import Button from "components/ui/Button"
import useSettingsParamsStore from "state/settingsParamsStore"

export default function QueueButton() {
  const fetchingMode = useSettingsParamsStore().getFetchingMode()

  const store = useMenuSelectorStore()
  const isPressed = store.getIsQueueOpen()

  const handleClick = async () => {
    store.toggleIsQueueOpen()
  }

  return (
    <Button
      svgIcon="/images/queue.svg"
      id="QueueButton"
      onClick={handleClick}
      isPressed={isPressed}
      disabled={fetchingMode === "desktopOnly"}
    />
  )
}
