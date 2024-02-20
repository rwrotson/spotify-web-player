import useMenuSelectorStore from "state/menuSelectorStore"
import Button from "components/ui/Button"

export default function SwitchButton() {
  const store = useMenuSelectorStore()

  const isPressed = store.state.isFetchingOn

  const handleClick = async () => {
    store.toggleIsFetchingOn()
  }

  return (
    <Button
      svgIcon="/images/switch.svg"
      id="SwitchButton"
      onClick={handleClick}
      isPressed={isPressed}
    />
  )
}
