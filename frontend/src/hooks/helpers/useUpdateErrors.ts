import { AxiosError } from "axios"
import useErrorsQueueStore from "state/errorStore"

function useUpdateErrors(error: Error | AxiosError | null | undefined): void {
  const errorQueue = useErrorsQueueStore.getState()
  if (error) {
    errorQueue.addError(error)
  }
}

export default useUpdateErrors
