export function request(url: string, options: RequestInit, token?: string) {
  return fetch(`${process.env.BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
}
