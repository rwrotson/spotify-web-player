import Button from "components/ui/Button"

const style: React.CSSProperties = {
  height: "100%",
}

interface ErrorCardProps {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorCard({
  error,
  resetErrorBoundary,
}: ErrorCardProps): JSX.Element {
  return (
    <div className="error-pnl">
      <Button
        style={style}
        svgIcon="/images/refresh.svg"
        onClick={resetErrorBoundary}
        id="ErrorCardResetButton"
      />
      <div className="error-card">
        <h1>ERROR: </h1>
        <div className="error-msg-container">
          <div className="error-msg">{error.message}</div>
        </div>
      </div>
    </div>
  )
}
