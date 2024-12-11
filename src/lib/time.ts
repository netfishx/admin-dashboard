"use client";

import { format } from "date-fns";

export function formatTime(time: number) {
  return format(time, "yyyy-MM-dd HH:mm:ss");
}
