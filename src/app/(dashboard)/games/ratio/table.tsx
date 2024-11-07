"use client";

import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { ratioAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function RatioTable({ data }: { data: GameConfig[] }) {
  const [list, setRatio] = useAtom(ratioAtom);
  useEffect(() => {
    setRatio(
      data.map((item) => ({
        gameId: item.gameId,
        percent: item.percent ?? 0,
        maxPercent: item.maxPercent ?? 0,
      })),
    );
  }, [data, setRatio]);

  const handleRatioChange = (changedPercent: number, id: number) => {
    setRatio(
      list.map(({ gameId, percent, maxPercent }) => ({
        gameId,
        percent:
          id === gameId
            ? changedPercent < 0
              ? 0
              : changedPercent > maxPercent
                ? maxPercent
                : changedPercent
            : percent,
        maxPercent,
      })),
    );
  };
  return (
    <TableBody>
      {list.map((item) => (
        <TableRow key={item.gameId}>
          <TableCell>{item.gameId}</TableCell>
          <TableCell className="flex items-center gap-2">
            <Input
              value={item.percent}
              type="number"
              min={0}
              max={item.maxPercent ?? 0}
              step={0.01}
              onChange={(e) =>
                handleRatioChange(Number(e.target.value), item.gameId)
              }
            />
            <span className="text-destructive">({item.maxPercent ?? 0}%)</span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
