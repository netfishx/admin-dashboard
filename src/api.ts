"use server";

import axios from "axios";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { headers } from "next/headers";
import type { AgentData } from "./app/[locale]/(dashboard)/users/agent/page";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && status <= 500;
  },
});

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export async function apiRequest({
  url,
  header,
  method,
  data,
  token,
  expire,
}: {
  url: string;
  header?: Record<string, string>;
  method?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
  token?: string;
  expire?: number;
}) {
  const nextHeaders = await headers();
  const ip = nextHeaders.get("x-forwarded-for");
  const locale = nextHeaders.get("accept-language");
  return await request({
    url,
    ip,
    locale,
    header,
    method,
    data,
    token,
    expire,
  });
}

async function request({
  url,
  ip,
  locale,
  header,
  method,
  data,
  token,
  expire,
}: {
  url: string;
  ip?: string | null;
  locale?: string | null;
  header?: Record<string, string>;
  method?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
  token?: string;
  expire?: number;
}) {
  "use cache";
  expire
    ? cacheLife({
        stale: expire,
        revalidate: expire,
        expire,
      })
    : cacheLife("seconds");

  const headers = {
    ...header,
    "Content-Type": "application/json",
    "Accept-Language": locale ?? "zh-CN",
  } as Record<string, string>;
  if (ip) {
    const array = ip?.split(",")[0]?.split(":");
    const result = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;
    headers["X-Forwarded-For"] = result;
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await instance({
      url,
      method,
      headers,
      data,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAgents() {
  return await apiRequest({ url: "/api/user" });
}
export async function updateUser(data: AgentData) {
  return await apiRequest({ url: "/api/updateUser", method: "PUT", data });
}
export async function addUser(data: AgentData) {
  return await apiRequest({ url: "/api/addUser", method: "POST", data });
}
