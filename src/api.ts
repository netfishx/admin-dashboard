// export function request(url: string, options: RequestInit, token?: string) {
//   return fetch(`${process.env.BASE_URL}${url}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     ...options,
//   });
// }

const BASE_URL = process.env.BASE_URL;
const TIMEOUT = 5000;

function validateStatus(status: number): boolean {
  return status >= 200 && status <= 500;
}

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export async function request(
  url: string,
  nextHeaders: Headers,
  config?: RequestInit,
  token?: string,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const fullUrl = new URL(url, BASE_URL);
    const array = nextHeaders.get("x-forwarded-for")?.split(",")[0]?.split(":");
    const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;
    const headers = new Headers({
      ...config?.headers,
      "X-Forwarded-For": ip,
      "Content-Type": "application/json",
    });

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
