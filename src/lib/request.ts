"use server";
import type { Res } from "@/lib/types";
import axios from "axios";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  expire?: number | "minutes" | "days" | "hours";
  tags?: string[];
}): Promise<{
  data: Res<T>;
  status: number;
}> {
  "use cache";
  if (typeof expire === "number") {
    cacheLife({
      stale: expire,
      revalidate: expire,
      expire: expire * 10,
    });
  } else {
    switch (expire) {
      case "minutes":
        cacheLife("minutes");
        break;
      case "days":
        cacheLife("days");
        break;
      case "hours":
        cacheLife("hours");
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

  let result: {
    data: Res<T>;
    status: number;
  };
  try {
    const res = await instance<Res<T>>({
      url,
      method,
      headers,
      data,
      params,
    });

    result = {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error(error);

    result = {
      status: -1,
      data: {
        code: 500,
        message: "服务繁忙，请稍后再试",
      },
    };
  }

  return result;
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
  expire?: number | "minutes" | "days" | "hours";
}): Promise<Res<T>> {
  const start = performance.now();
  const nextHeaders = await headers();
  const ip = nextHeaders.get("x-forwarded-for");
  const locale = nextHeaders.get("accept-language");
  const result = await request<T>({
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
  console.group("request");
  if (result.status >= 400 || result.data.code !== 0) {
    console.error("error!!!");
  }
  console.dir(
    {
      url,
      ip,
      locale,
      header,
      method,
      data,
      params,
      token,
      expire,
      result,
      time: performance.now() - start,
    },
    { depth: null },
  );
  console.groupEnd();

  if ([401, 403, 500].includes(result.status)) {
    return redirect(
      `/login?e=${encodeURIComponent(result.data.message ?? "")}`,
    );
  }

  return result.data;
}
