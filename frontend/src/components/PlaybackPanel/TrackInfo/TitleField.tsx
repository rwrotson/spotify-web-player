interface TitleFieldProps {
  title: string | undefined
}

function TitleField({ title }: TitleFieldProps): JSX.Element {
  return <span>{title ? <b>{title}</b> : "..."}</span>
}

export default TitleField
