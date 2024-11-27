"use client";
import { Switch } from "@/components/ui/switch";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { holdStatusAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useLayoutEffect } from "react";

export function FlyOrderTable({ data }: { data: GameConfig[] }) {
  const [list, setHoldStatus] = useAtom(holdStatusAtom);
  useLayoutEffect(() => {
    setHoldStatus(
      data.map(({ gameId, gameName, holdStatus }) => ({
        gameId,
        gameName,
        holdStatus: holdStatus ?? 0,
      })),
    );
  }, [data, setHoldStatus]);

  const handleStatusChange = (checked: boolean, id: number) => {
    setHoldStatus(
      list.map(({ gameId, gameName, holdStatus }) => ({
        gameId,
        gameName,
        holdStatus: id === gameId ? (checked ? 1 : 0) : holdStatus,
      })),
    );
  };

  const t = useTranslations();

  return (
    <TableBody>
      {data.length > 0 ? (
        data.map((item) => (
          <TableRow key={item.gameId}>
            <TableCell>{item.gameName}</TableCell>
            <TableCell className="w-32 flex justify-center items-center h-10">
              <Switch
                defaultChecked={item.holdStatus === 1}
                onCheckedChange={(checked) => {
                  handleStatusChange(checked, item.gameId);
                }}
              />
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
