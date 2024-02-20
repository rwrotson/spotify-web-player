import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Button from "components/ui/Button"
import useIsLikedQuery from "hooks/spotify/useIsLikedQuery"
import useGetLastPlaybackQuery from "hooks/spotify/useGetLastPlaybackQuery"
import { addLike, removeLike } from "utils/fetch/spotifyAPI"
import useSettingsParamsStore from "state/settingsParamsStore"

function useOptimistic(isLiked: boolean, isPending: boolean): boolean | null {
  const [prevValue, setPrevValue] = useState<boolean | null>(null)
  const [optimValue, setOptimValue] = useState<boolean | null>(null)

  useEffect(() => {
    setPrevValue(isLiked)
    if (isPending) {
      setOptimValue(!prevValue)
    } else {
      setPrevValue(null)
    }

    return () => {
      setOptimValue(null)
      setPrevValue(null)
    }
  }, [isPending, prevValue, optimValue])

  return optimValue
}

function useLikeMutation(trackId: string | undefined, isLiked: boolean) {
  const queryClient = useQueryClient()

  const [isPending, setIsPending] = useState(false)

  const mutationResult = useMutation({
    mutationKey: ["playbackMutation", "like"],
    mutationFn: async () => {
      setIsPending(true)
      if (trackId === undefined) {
        return
      }
      if (isLiked) {
        return await removeLike(trackId)
      }
      return await addLike(trackId)
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["isLiked"] })
      queryClient.cancelQueries({ queryKey: ["like"] })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["isLiked"] })
      setTimeout(() => setIsPending(false), 500)
    },
  })

  const optimisticValue = useOptimistic(
    isLiked,
    mutationResult.isPending || isPending,
  )

  return { ...mutationResult, isPending, optimisticValue }
}

export default function LikeButton() {
  const fetchingMode = useSettingsParamsStore().getFetchingMode()

  const trackId = useGetLastPlaybackQuery()?.track.id
  const isLiked = useIsLikedQuery(trackId)

  const mutationResult = useLikeMutation(trackId, isLiked)
  const { isPending, mutate: handleLike, optimisticValue } = mutationResult

  return (
    <Button
      svgIcon="/images/like.svg"
      id="LikeButton"
      isPressed={optimisticValue !== null ? optimisticValue : isLiked}
      onClick={handleLike}
      disabled={fetchingMode === "desktopOnly" || isPending}
    />
  )
}
