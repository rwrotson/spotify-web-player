import { url } from "types/types"

interface CoverImageProps {
  albumArt: url | undefined
}

function CoverImage({ albumArt }: CoverImageProps): JSX.Element {
  return (
    <div className="cover-img">
      <img src={albumArt} alt="CoverImage" id="CoverImage" />
    </div>
  )
}

export default CoverImage
