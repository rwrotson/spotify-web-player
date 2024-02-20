import { UseQueryResult } from "@tanstack/react-query"
import useLoadingStore, { isLoading } from "state/loadingStore"

function useUpdateLoading(
  queryResult: UseQueryResult,
  type: keyof isLoading = "other",
): void {
  const loadingStore = useLoadingStore.getState()

  loadingStore.setLoading(queryResult.isLoading, type)
}

export default useUpdateLoading
