"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function TimeWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    // 获取当前时区偏移量(分钟)
    const tz = new Date().getTimezoneOffset();
    if (params.get("tz") !== tz.toString()) {
      params.set("tz", tz.toString());
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [params, pathname, router]);

  return null;
}
