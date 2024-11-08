"use client";

import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameOdds } from "@/lib/types";
import { changedOddsLimitAtom, limitAtom, oddsAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function OddsTable({ list }: { list: GameOdds[] }) {
  const [odds, setOdds] = useAtom(oddsAtom);
  const [changedList, setChangedList] = useAtom(changedOddsLimitAtom);
  const [limit, setLimit] = useAtom(limitAtom);

  useEffect(() => {
    setOdds(Object.fromEntries(list.map((item) => [item.oddsType, item.odds])));
    setLimit(
      Object.fromEntries(
        list.map((item) => [
          item.betType,
          {
            minBet: item.minBet,
            maxBet: item.maxBet,
            maxBetPeriod: item.maxBetPeriod,
          },
        ]),
      ),
    );
  }, [list, setOdds, setLimit]);

  function handleOddsChange(oddsType: number, betType: number, value: string) {
    // setChangedList(changedList.add(`${oddsType}-${betType}`));
    setOdds({
      ...odds,
      [oddsType]: value,
    });
  }

  function handleLimitChange(
    oddsType: number,
    betType: number,
    field: "minBet" | "maxBet" | "maxBetPeriod",
    value: number,
  ) {
    setChangedList(changedList.add(`${oddsType}-${betType}`));
    setLimit({
      ...limit,
      [betType]: {
        ...limit[betType],
        [field]: value,
      },
    });
  }
  return (
    <TableBody>
      {list.map((item) => (
        <TableRow key={`${item.oddsType}-${item.betType}`}>
          <TableCell>{item.oddsLabel}</TableCell>
          <TableCell>
            <Input
              value={odds[item.oddsType] ?? ""}
              type="number"
              min={0}
              step={0.01}
              onChange={(e) =>
                handleOddsChange(item.oddsType, item.betType, e.target.value)
              }
            />
          </TableCell>
          <TableCell>
            <Input
              value={limit[item.betType]?.minBet ?? ""}
              type="number"
              min={1}
              disabled={!item.canEdit}
              onChange={(e) =>
                handleLimitChange(
                  item.oddsType,
                  item.betType,
                  "minBet",
                  Number(e.target.value),
                )
              }
            />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Input
                value={limit[item.betType]?.maxBet ?? ""}
                type="number"
                min={1}
                max={item.maxBetLimit ?? 1}
                disabled={!item.canEdit}
                onChange={(e) =>
                  handleLimitChange(
                    item.oddsType,
                    item.betType,
                    "maxBet",
                    Number(e.target.value),
                  )
                }
              />
              <span className="text-destructive w-20">
                ({item.maxBetLimit})
              </span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Input
                value={limit[item.betType]?.maxBetPeriod ?? ""}
                type="number"
                min={1}
                max={item.maxBetPeriodLimit ?? 1}
                disabled={!item.canEdit}
                onChange={(e) =>
                  handleLimitChange(
                    item.oddsType,
                    item.betType,
                    "maxBetPeriod",
                    Number(e.target.value),
                  )
                }
              />
              <span className="text-destructive w-20">
                ({item.maxBetPeriodLimit})
              </span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
