import { useState } from "react"
import useColorThemeQuery from "hooks/misc/useColorThemeQuery"

type HtmlAttrs =
  | string
  | boolean
  | React.CSSProperties
  | ((...args: any[]) => void)

interface ButtonProps {
  svgIcon: string
  id: string
  onClick: (...args: any[]) => void
  isPressed?: boolean
  type?: "button" | "submit" | "reset"
  [key: string]: HtmlAttrs | undefined
}

export default function Button({
  svgIcon,
  id,
  onClick,
  type = "button",
  isPressed = false,
  ...props
}: ButtonProps): JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const btnBackgroundColorStyle: React.CSSProperties = {
    backgroundColor: useColorThemeQuery().ultralight,
  }

  const onClickWithAnimation = () => {
    setIsClicked(true)
    onClick()
    setTimeout(() => {
      setIsClicked(false)
    }, 250)
  }

  return (
    <button
      className={
        "btn" +
        `${isClicked ? " btn-clicked" : ""}` +
        `${isPressed ? " btn-pressed" : ""}`
      }
      style={btnBackgroundColorStyle}
      type={type}
      id={id}
      onClick={isClicked ? () => {} : onClickWithAnimation}
      aria-label={id}
      {...props}
    >
      <img
        className={
          "btn-img" +
          `${isClicked ? " btn-img-clicked" : ""}` +
          `${isPressed ? " btn-img-pressed" : ""}`
        }
        src={svgIcon}
        alt={id}
      />
    </button>
  )
}
