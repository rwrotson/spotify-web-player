interface WarningCardProps {
  isLoading?: boolean
  errorMessage?: string
}

export default function WarningCard({
  isLoading,
  errorMessage,
}: WarningCardProps): JSX.Element {
  return (
    <>
      {isLoading && <div className="info-fld">Loading...</div>}
      {errorMessage && <div className="info-fld">{errorMessage}</div>}
    </>
  )
}
