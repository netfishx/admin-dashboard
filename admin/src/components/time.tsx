"use client";

import { format } from "date-fns";

export function Time({
  time,
  formatStr = "yyyy-MM-dd HH:mm:ss",
}: {
  time: number;
  formatStr?: string;
}) {
  return <>{format(time, formatStr)}</>;
}
