import { store } from "../redux/store";
import { setActiveLoader } from "../redux/general/actions";
import type { LoadingType, ErrorResponse } from "../App.types";

type RequestFlowOptions<T> = {
  request: () => Promise<T>;
  delay?: number;
  loadingType?: LoadingType;
  onSuccess?: (res: T) => void;
  onError?: (error: ErrorResponse) => void;
  onFinally?: () => void;
};

export async function handleRequestFlow<T>(options: RequestFlowOptions<T>) {
  const { request, delay, loadingType, onSuccess, onError, onFinally } =
    options;

  if (loadingType) store.dispatch(setActiveLoader(loadingType));

  try {
    const [requestResult] = await Promise.allSettled([
      request(),
      new Promise((resolve) => setTimeout(resolve, delay ?? 0)),
    ]);

    if (requestResult.status === "rejected") throw requestResult.reason;
    if (requestResult.status === "fulfilled" && onSuccess) {
      onSuccess(requestResult.value);
    }
  } catch (error) {
    if (onError) onError(error as ErrorResponse);
  } finally {
    if (loadingType) store.dispatch(setActiveLoader(null));
    if (onFinally) onFinally();
  }
}
