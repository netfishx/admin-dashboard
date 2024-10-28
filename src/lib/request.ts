"use server";

import axios from "axios";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { headers } from "next/headers";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && status <= 500;
  },
});

const FALLBACK_IP_ADDRESS = "0.0.0.0";

async function request({
  url,
  ip,
  locale,
  header,
  method,
  data,
  token,
  expire,
  tags,
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
  tags?: string[];
}) {
  "use cache";
  expire
    ? cacheLife({
        stale: expire,
        revalidate: expire,
        expire,
      })
    : cacheLife("seconds");
  tags && cacheTag(...tags);
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
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
}

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
