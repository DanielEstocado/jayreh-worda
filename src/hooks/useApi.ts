import { useCallback, useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import type { AxiosRequestConfig, Method } from "axios";
import { axiosInstance } from "@/config/axios-instance";
import { extractErrorMessage } from "@/lib/extractErrorMessage";

type MutationOptions<T> = {
  onSuccess?: (data: T) => void;
  // Passing this means the caller owns telling the user what happened, the hook skips its own toast.
  onError?: (error: unknown) => void;
};

// Fetches a GET endpoint and caches it, pass null to skip. The caller must render `error`, nothing toasts here.
export function useApiQuery<T = unknown>(url: string | null, config?: AxiosRequestConfig) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, () =>
    axiosInstance.get<T>(url!, config).then((res) => res.data),
  );

  return { data, error, isLoading, refetch: mutate };
}

// Fires a one-off write request. A failure is always surfaced and never rejects, so no caller needs a try/catch.
export function useApiMutation<T = unknown, B = unknown>(url: string, method: Method = "POST") {
  const [isMutating, setIsMutating] = useState(false);

  // Sends the request, resolving to the response data, or undefined when it failed.
  const trigger = useCallback(
    async (body?: B, options?: MutationOptions<T>): Promise<T | undefined> => {
      setIsMutating(true);
      try {
        const response = await axiosInstance.request<T>({ url, method, data: body });
        options?.onSuccess?.(response.data);
        return response.data;
      } catch (error) {
        if (options?.onError) {
          options.onError(error);
        } else {
          toast.error(extractErrorMessage(error));
        }
        return undefined;
      } finally {
        setIsMutating(false);
      }
    },
    [url, method],
  );

  return { trigger, isMutating };
}
