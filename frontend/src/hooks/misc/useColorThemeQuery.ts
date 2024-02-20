import { useQuery } from "@tanstack/react-query"
import getColorTheme from "utils/color/main"
import useGetLastPlaybackQuery from "hooks/spotify/useGetLastPlaybackQuery"
import { ColorTheme } from "types/types"

const defaultTheme = {
  ultralight: "hsl(0, 0%, 92.5%)",
  light: "hsl(0, 0%, 14%)",
  dark: "hsl(0, 0%, 7.5%)",
}

export default function useColorThemeQuery(): ColorTheme {
  const trackId = useGetLastPlaybackQuery()?.track.id
  const { data: colorTheme } = useQuery({
    queryFn: async () => getColorTheme(),
    queryKey: ["colorTheme", trackId],
    initialData: defaultTheme,
  })
  return colorTheme
}
