"use client";

import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameOdds } from "@/lib/types";
import { changedOddsLimitAtom, limitAtom, oddsAtom } from "@/store";
import { uniq } from "es-toolkit";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useLayoutEffect } from "react";

export function OddsTable({ list }: { list: GameOdds[] }) {
  const [odds, setOdds] = useAtom(oddsAtom);
  const [changedList, setChangedList] = useAtom(changedOddsLimitAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const translations = useTranslations();
  useLayoutEffect(() => {
    setOdds(
      Object.fromEntries(
        list.map((item) => [
          `${item.oddsType}-${item.betType}`,
          item.odds ?? "",
        ]),
      ),
    );
    setLimit(
      Object.fromEntries(
        list.map((item) => [
          `${item.oddsType}-${item.betType}`,
          {
            minBet: item.minBet,
            maxBet: item.maxBet,
            maxBetLimit: item.maxBetLimit,
            maxBetPeriod: item.maxBetPeriod,
            maxBetPeriodLimit: item.maxBetPeriodLimit,
          },
        ]),
      ),
    );
  }, [list, setOdds, setLimit]);

  function handleOddsChange(oddsType: number, betType: number, value: string) {
    setChangedList(uniq([...changedList, `${oddsType}-${betType}`]));
    setOdds({
      ...odds,
      [`${oddsType}-${betType}`]: value,
    });
  }

  function handleLimitChange(
    oddsType: number,
    betType: number,
    groupId: number,
    field: "minBet" | "maxBet" | "maxBetPeriod",
    value: number,
  ) {
    setChangedList(uniq([...changedList, `${oddsType}-${betType}`]));
    setLimit({
      ...limit,
      ...Object.fromEntries(
        list
          .filter((item) => item.groupId === groupId)
          .map((item) => [
            `${item.oddsType}-${item.betType}`,
            {
              ...limit[`${item.oddsType}-${item.betType}`],
              [field]: value,
            },
          ]),
      ),
    });
  }
  return (
    <TableBody>
      {list.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-40">
            {translations("noData")}
          </TableCell>
        </TableRow>
      ) : (
        list.map((item) => (
          <TableRow key={`${item.oddsType}-${item.betType}`}>
            <TableCell>{item.oddsLabel}</TableCell>
            <TableCell>
              <Input
                value={odds[`${item.oddsType}-${item.betType}`] ?? ""}
                type="number"
                min={0}
                step={0.001}
                onChange={(e) =>
                  handleOddsChange(item.oddsType, item.betType, e.target.value)
                }
                onBlur={(e) => {
                  e.target.reportValidity();
                }}
              />
            </TableCell>
            <TableCell>
              <Input
                value={limit[`${item.oddsType}-${item.betType}`]?.minBet ?? ""}
                type="number"
                min={1}
                disabled={!item.canEdit}
                onChange={(e) =>
                  handleLimitChange(
                    item.oddsType,
                    item.betType,
                    item.groupId ?? 0,
                    "minBet",
                    Number(e.target.value),
                  )
                }
                onBlur={(e) => {
                  e.target.reportValidity();
                }}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  value={
                    limit[`${item.oddsType}-${item.betType}`]?.maxBet ?? ""
                  }
                  type="number"
                  min={1}
                  max={item.maxBetLimit ?? 1}
                  disabled={!item.canEdit}
                  onChange={(e) =>
                    handleLimitChange(
                      item.oddsType,
                      item.betType,
                      item.groupId ?? 0,
                      "maxBet",
                      Number(e.target.value),
                    )
                  }
                  onBlur={(e) => {
                    e.target.reportValidity();
                  }}
                />
                {item.maxBetLimit ? (
                  <span className="text-destructive w-20">
                    ({item.maxBetLimit})
                  </span>
                ) : null}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  value={
                    limit[`${item.oddsType}-${item.betType}`]?.maxBetPeriod ??
                    ""
                  }
                  type="number"
                  min={1}
                  max={item.maxBetPeriodLimit ?? 1}
                  disabled={!item.canEdit}
                  onChange={(e) =>
                    handleLimitChange(
                      item.oddsType,
                      item.betType,
                      item.groupId ?? 0,
                      "maxBetPeriod",
                      Number(e.target.value),
                    )
                  }
                  onBlur={(e) => {
                    e.target.reportValidity();
                  }}
                />
                {item.maxBetPeriodLimit ? (
                  <span className="text-destructive w-20">
                    ({item.maxBetPeriodLimit})
                  </span>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
