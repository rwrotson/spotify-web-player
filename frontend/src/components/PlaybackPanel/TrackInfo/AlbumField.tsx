interface AlbumFieldProps {
  year: number | undefined
  albumTitle: string | undefined
}

function AlbumField({ year, albumTitle }: AlbumFieldProps): JSX.Element {
  return (
    <span>
      {albumTitle && year ? (
        <i>
          {year.toString()} - {albumTitle}
        </i>
      ) : albumTitle ? (
        <i>{albumTitle}</i>
      ) : (
        <i>"..."</i>
      )}
    </span>
  )
}

export default AlbumField
