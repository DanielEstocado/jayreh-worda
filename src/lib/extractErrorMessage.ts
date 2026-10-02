import { isAxiosError } from "axios";

const GENERIC_MESSAGE = "Something went wrong. Please try again.";

// Pulls a human-readable message out of a failed API call, falling back to a generic one.
export function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.response) {
      return (error.response.data as { message?: string } | undefined)?.message ?? GENERIC_MESSAGE;
    }
    if (error.code === "ECONNABORTED") return "The request timed out. Please try again.";
    if (error.request) return "Can't reach the server. Check your connection and try again.";
  }
  if (error instanceof Error) return error.message;
  return GENERIC_MESSAGE;
}
