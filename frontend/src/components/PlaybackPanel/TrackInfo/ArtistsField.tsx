interface ArtistsFieldProps {
  artists: string[] | string | undefined
}

function ArtistsField({ artists }: ArtistsFieldProps): JSX.Element {
  const displayArtists = Array.isArray(artists) ? artists.join(", ") : artists

  return (
    <span>
      {displayArtists && displayArtists.length ? displayArtists : "..."}
    </span>
  )
}

export default ArtistsField
