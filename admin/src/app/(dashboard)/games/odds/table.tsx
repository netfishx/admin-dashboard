"use client";

import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { GameOdds } from "@/lib/types";
import { uniq } from "@/lib/utils";
import {
  changedOddsLimitAtom,
  limitAtom,
  oddsAtom,
  verifyLimitAtom,
} from "@/store";

import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useLayoutEffect } from "react";

export function OddsTable({
  list,
  hasAdminPermission,
}: {
  list: GameOdds[];
  hasAdminPermission: boolean;
}) {
  const [odds, setOdds] = useAtom(oddsAtom);
  const [changedList, setChangedList] = useAtom(changedOddsLimitAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const translations = useTranslations();
  useLayoutEffect(() => {
    setOdds(
      Object.fromEntries(
        list.map((item) => [
          `${item.oddsType}-${item.betType}`,
          item.odds ? Number(item.odds) : 0,
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
      [`${oddsType}-${betType}`]: Number(value) > 0 ? Number(value) : 0,
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
  const setVerifyLimit = useSetAtom(verifyLimitAtom);
  return (
    <TableBody>
      {list.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="h-48 text-center">
            {translations("noData")}
          </TableCell>
        </TableRow>
      ) : (
        list.map((item) => (
          <TableRow key={`${item.oddsType}-${item.betType}`}>
            <TableCell>{item.oddsLabel}</TableCell>
            <TableCell>
              <Input
                value={
                  odds[`${item.oddsType}-${item.betType}`]?.toString() ?? ""
                }
                type="number"
                disabled={!hasAdminPermission}
                min={0}
                step={0.001}
                onChange={(e) => {
                  setVerifyLimit(e.target.reportValidity());
                  handleOddsChange(
                    item.oddsType ?? 0,
                    item.betType,
                    e.target.value,
                  );
                }}
                onBlur={(e) => {
                  const state = e.target.reportValidity();
                  if (!state) {
                    e.target.focus();
                  }
                }}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  value={
                    limit[
                      `${item.oddsType}-${item.betType}`
                    ]?.minBet?.toString() ?? ""
                  }
                  type="number"
                  min={item.minBetLimit ? item.minBetLimit : 1}
                  disabled={!item.canEdit}
                  onChange={(e) => {
                    setVerifyLimit(
                      !!e.target.value && e.target.reportValidity(),
                    );
                    handleLimitChange(
                      item.oddsType ?? 0,
                      item.betType,
                      item.groupId ?? 0,
                      "minBet",
                      Number(e.target.value),
                    );
                  }}
                  onBlur={(e) => {
                    const state = e.target.reportValidity();
                    if (!state) {
                      e.target.focus();
                    }
                  }}
                />
                {item.minBetLimit ? (
                  <span className="w-20 shrink-0 text-destructive">
                    ({item.minBetLimit})
                  </span>
                ) : null}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  value={
                    limit[
                      `${item.oddsType}-${item.betType}`
                    ]?.maxBet?.toString() ?? ""
                  }
                  type="number"
                  min={1}
                  max={item.maxBetLimit ?? Number.MAX_SAFE_INTEGER}
                  disabled={!item.canEdit}
                  onChange={(e) => {
                    setVerifyLimit(
                      !!e.target.value && e.target.reportValidity(),
                    );
                    handleLimitChange(
                      item.oddsType ?? 0,
                      item.betType,
                      item.groupId ?? 0,
                      "maxBet",
                      Number(e.target.value),
                    );
                  }}
                  onBlur={(e) => {
                    const state = e.target.reportValidity();
                    if (!state) {
                      e.target.focus();
                    }
                  }}
                />
                {item.maxBetLimit ? (
                  <span className="w-20 shrink-0 text-destructive">
                    ({item.maxBetLimit})
                  </span>
                ) : null}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  value={
                    limit[
                      `${item.oddsType}-${item.betType}`
                    ]?.maxBetPeriod?.toString() ?? ""
                  }
                  type="number"
                  min={1}
                  max={item.maxBetPeriodLimit ?? Number.MAX_SAFE_INTEGER}
                  disabled={!item.canEdit}
                  onChange={(e) => {
                    setVerifyLimit(
                      !!e.target.value && e.target.reportValidity(),
                    );
                    handleLimitChange(
                      item.oddsType ?? 0,
                      item.betType,
                      item.groupId ?? 0,
                      "maxBetPeriod",
                      Number(e.target.value),
                    );
                  }}
                  onBlur={(e) => {
                    const state = e.target.reportValidity();
                    if (!state) {
                      e.target.focus();
                    }
                  }}
                />
                {item.maxBetPeriodLimit ? (
                  <span className="w-20 shrink-0 text-destructive">
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
