"use server";
import type { Res } from "@/lib/types";
import { signOut } from "@/session";
import axios from "axios";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
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
    "Content-Type": "application/json",
    ...header,
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

    if (res.status === 401) {
      await signOut();
      return redirect("/login");
    }
    return res.data;
  } catch (error) {
    console.error(error);

    return {
      code: 500,
      message: "未知异常",
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
  expire?: number | "default" | "minutes" | "days" | "max";
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
