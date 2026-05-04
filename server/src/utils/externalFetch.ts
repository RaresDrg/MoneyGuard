import { createError } from "./index.js";

export async function externalFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      const error = `HTTP ${response.status} — ${response.statusText}: ${errorText}`;
      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    console.error("❌ [External fetch failed]");
    console.error(error);
    throw createError("BadGateway");
  }
}
