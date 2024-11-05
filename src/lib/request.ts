"use server";
import type { Res } from "@/lib/types";
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

async function request<T>({
  url,
  ip,
  locale,
  header,
  method,
  params,
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
  params?: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
  token?: string;
  expire?: number | "default" | "minutes" | "days" | "max";
  tags?: string[];
}): Promise<Res<T>> {
  "use cache";
  if (typeof expire === "number") {
    cacheLife({
      stale: expire,
      revalidate: expire,
      expire,
    });
  } else {
    switch (expire) {
      case "default":
        cacheLife("default");
        break;
      case "minutes":
        cacheLife("minutes");
        break;
      case "days":
        cacheLife("days");
        break;
      case "max":
        cacheLife("max");
        break;
      default:
        cacheLife("seconds");
    }
  }
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
    const res = await instance<Res<T>>({
      url,
      method,
      headers,
      data,
      params,
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

export async function apiRequest<T>({
  url,
  header,
  method,
  data,
  params,
  token,
  expire,
}: {
  url: string;
  header?: Record<string, string>;
  method?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  params?: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
  token?: string;
  expire?: number;
}): Promise<Res<T>> {
  const nextHeaders = await headers();
  const ip = nextHeaders.get("x-forwarded-for");
  const locale = nextHeaders.get("accept-language");
  return await request<T>({
    url,
    ip,
    locale,
    header,
    method,
    params,
    data,
    token,
    expire,
  });
}
