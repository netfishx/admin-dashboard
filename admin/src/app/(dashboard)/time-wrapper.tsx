"use client";

import { useTransitionRouter } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function TimeWrapper() {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // 获取当前时区偏移量(分钟)
    const tz = new Date().getTimezoneOffset();
    if (params.get("tz") !== tz.toString()) {
      params.set("tz", tz.toString());
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }
  }, []);

  return null;
}
