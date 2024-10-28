import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && status <= 500;
  },
});

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export async function request({
  url,
  nextHeaders,
  header,
  method,
  data,
  token,
}: {
  url: string;
  nextHeaders?: Headers;
  header?: Record<string, string>;
  method?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
  token?: string;
}) {
  const headers = {
    ...header,
    "Content-Type": "application/json",
    "Accept-Language": nextHeaders?.get("Accept-Language") ?? "zh-CN",
  } as Record<string, string>;
  if (nextHeaders) {
    const array = nextHeaders
      ?.get("x-forwarded-for")
      ?.split(",")[0]
      ?.split(":");
    const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;
    headers["X-Forwarded-For"] = ip;
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return await instance({
    url,
    method,
    headers,
    data,
  });
}
export interface AgentData {
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: number;
}

export async function getAgents() {
  const req = {
    url: "/api/user",
    method: "GET",
  };
  const { data } = await request(req);
  return data;
}
export async function updateUser(data: AgentData) {
  const req = {
    method: "PUT",
    url: "/api/updateUser",
    data: JSON.stringify(data),
  };
  const res = await request(req);
  return res;
}
export async function addUser(data: AgentData) {
  const req = {
    method: "POST",
    url: "/api/addUser",
    data: JSON.stringify(data),
  };
  const res = await request(req);
  return res;
}
