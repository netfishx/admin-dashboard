"use client";

import { format } from "date-fns";

export function Time({ time }: { time: number }) {
  return <>{format(time, "yyyy-MM-dd HH:mm:ss")}</>;
}
