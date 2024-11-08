"use client";
import { Switch } from "@/components/ui/switch";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { holdStatusAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function FlyOrderTable({ data }: { data: GameConfig[] }) {
  const [list, setHoldStatus] = useAtom(holdStatusAtom);
  useEffect(() => {
    setHoldStatus(
      data.map((item) => ({
        gameId: item.gameId,
        holdStatus: item.holdStatus ?? 0,
      })),
    );
  }, [data, setHoldStatus]);

  const handleStatusChange = (checked: boolean, id: number) => {
    setHoldStatus(
      list.map(({ gameId, holdStatus }) => ({
        gameId,
        holdStatus: id === gameId ? (checked ? 1 : 0) : holdStatus,
      })),
    );
  };

  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.gameId}>
          <TableCell>{item.gameId}</TableCell>
          <TableCell className="w-32 flex justify-center items-center h-10">
            <Switch
              defaultChecked={item.holdStatus === 1}
              onCheckedChange={(checked) => {
                handleStatusChange(checked, item.gameId);
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
