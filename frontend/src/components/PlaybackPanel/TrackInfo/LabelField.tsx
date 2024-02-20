import useSettingsParamsStore from "state/settingsParamsStore"

interface LabelFieldProps {
  label: string | undefined
}

function LabelField({ label }: LabelFieldProps): JSX.Element {
  const fetchingMode = useSettingsParamsStore().getFetchingMode()
  const displayLabel = label ? `[ ${label} ]` : "[ ... ]"

  return <span>{fetchingMode === "desktopOnly" ? "" : displayLabel}</span>
}

export default LabelField
