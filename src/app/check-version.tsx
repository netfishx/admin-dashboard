"use client";

import { getVersion } from "@/actions";
import { useEffect } from "react";

export function CheckVersion() {
  const timestamp = process.env.NEXT_PUBLIC_TIMESTAMP;
  useEffect(() => {
    const interval = setInterval(async () => {
      const version = await getVersion();
      if (version !== timestamp) {
        console.error("版本更新", version, timestamp);
        window.location.reload();
      }
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timestamp]);
  return null;
}
