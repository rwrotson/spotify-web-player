import { useQueryClient } from "@tanstack/react-query"
import { Playback } from "types/types"

export default function useGetLastPlaybackQuery(): Playback | undefined {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<Playback>(["playback"])
}
