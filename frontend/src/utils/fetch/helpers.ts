import { ConnectionError } from "types/errors"

export async function callWithExponentialRetries<T extends any>(
  fetchFunction: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
): Promise<T> {
  let currentRetryNumber = 0
  let currentDelay = initialDelay

  const delayAndRetry = async () => {
    await new Promise((resolve) => setTimeout(resolve, currentDelay))
    currentDelay *= 2
    currentRetryNumber++
  }

  while (currentRetryNumber < maxRetries) {
    try {
      return await fetchFunction()
    } catch (error: unknown) {
      if (!(error instanceof ConnectionError)) {
        throw error
      }
    }

    await delayAndRetry()
  }

  throw new ConnectionError("Max retries exceeded, connection timeout")
}
