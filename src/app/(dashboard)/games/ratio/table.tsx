"use client";

import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { ratioAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function RatioTable({ data }: { data: GameConfig[] }) {
  const [list, setRatio] = useAtom(ratioAtom);
  useEffect(() => {
    setRatio(
      data.map(({ gameId, gameName, percent, maxPercent }) => ({
        gameId,
        gameName,
        percent: percent ?? "0",
        maxPercent: maxPercent ?? "0",
      })),
    );
  }, [data, setRatio]);

  const handleRatioChange = (changedPercent: string, id: number) => {
    setRatio(
      list.map(({ gameId, gameName, percent, maxPercent }) => ({
        gameId,
        gameName,
        percent:
          id === gameId
            ? Number(changedPercent) < 0
              ? "0"
              : Number(changedPercent) > Number(maxPercent)
                ? maxPercent
                : changedPercent
            : percent,
        maxPercent,
      })),
    );
  };
  const t = useTranslations();
  return (
    <TableBody>
      {list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.gameId}>
            <TableCell>{item.gameName}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Input
                value={item.percent}
                type="number"
                min={0}
                max={item.maxPercent ?? 0}
                step={0.01}
                onChange={(e) => handleRatioChange(e.target.value, item.gameId)}
              />
              <span className="text-destructive w-16">
                ({item.maxPercent ?? 0}%)
              </span>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={2} className="text-center h-40">
            {t("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
