"use client";

import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { rebateAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useLayoutEffect } from "react";

export function RebateTable({ data }: { data: GameConfig[] }) {
  const [list, setRebate] = useAtom(rebateAtom);
  useLayoutEffect(() => {
    setRebate(
      data.map(({ gameId, gameName, backRate, maxBackRate }) => ({
        gameId,
        gameName,
        backRate: backRate ?? "0",
        maxBackRate: maxBackRate ?? "100",
      })),
    );
  }, [data, setRebate]);

  const handleRebateChange = (rebate: string, id: number) => {
    setRebate(
      list.map(({ gameId, gameName, backRate, maxBackRate }) => ({
        gameId,
        gameName,
        backRate:
          id === gameId
            ? Number(rebate) < 0
              ? "0"
              : Number(rebate) > Number(maxBackRate)
                ? maxBackRate
                : rebate
            : backRate,
        maxBackRate,
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
                value={item.backRate}
                type="number"
                min={0}
                max={item.maxBackRate ?? 0}
                step={0.01}
                onChange={(e) =>
                  handleRebateChange(e.target.value, item.gameId)
                }
                onBlur={(e) => {
                  e.target.reportValidity();
                }}
              />
              {item.maxBackRate ? (
                <span className="text-destructive w-16">
                  ({item.maxBackRate}%)
                </span>
              ) : null}
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
