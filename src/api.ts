const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TIMEOUT = 5000;

function validateStatus(status: number): boolean {
  return status >= 200 && status <= 500;
}

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export async function request(
  url: string,
  nextHeaders?: Headers,
  config?: RequestInit,
  token?: string,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const fullUrl = new URL(url, BASE_URL);

    const headers = new Headers({
      ...config?.headers,
      "Content-Type": "application/json",
      "Accept-Language": nextHeaders?.get("Accept-Language") ?? "zh-CN",
    });
    if (nextHeaders) {
      const array = nextHeaders
        ?.get("x-forwarded-for")
        ?.split(",")[0]
        ?.split(":");
      const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;
      headers.set("X-Forwarded-For", ip);
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(fullUrl.toString(), {
      ...config,
      headers,
      signal: controller.signal,
    });

    if (!validateStatus(response.status)) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}
