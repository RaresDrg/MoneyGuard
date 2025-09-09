export async function requestWithDelay<T>(request: Promise<T>, delay: number) {
  const delayPromise = new Promise((resolve) => setTimeout(resolve, delay));

  const [, requestResult] = await Promise.allSettled([delayPromise, request]);

  if (requestResult.status === "fulfilled") {
    return requestResult.value;
  }

  throw requestResult.reason;
}
