"use client";
import { endOfDay, startOfDay } from "date-fns";
import { TableServer } from "./table-server";

export function TableWrapper({
  pageNum,
  pageSize,
  start,
  end,
  ip,
}: { pageNum: string; pageSize: string; start: Date; end: Date; ip: string }) {
  const now = Date.now();
  const startTime = start ? start : startOfDay(now);
  const endTime = end ? end : endOfDay(now);

  return (
    <TableServer
      start={startTime}
      end={endTime}
      pageNum={pageNum}
      pageSize={pageSize}
      ip={ip}
    />
  );
}
