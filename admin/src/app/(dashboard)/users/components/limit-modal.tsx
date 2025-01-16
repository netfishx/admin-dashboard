"use client";

import { getGameOdds, updateGameOdds } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { limitDataAtom, limitGamesAtom, limitModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { startTransition, useState, useTransition } from "react";
import { toast } from "sonner";

export function LimitModal({ userId }: { userId: string }) {
  const translations = useTranslations();
  const [open, setOpen] = useAtom(limitModalAtom);
  const t = useTranslations("users.agents");
  const [isPending, startTransition] = useTransition();
  const list = useAtomValue(limitGamesAtom);
  const [gameId, setGameId] = useState<number | undefined>();
  const [data, setData] = useAtom(limitDataAtom);
  const [changedItems, setChangedItems] = useState<
    Record<number, Record<"minBet" | "maxBet" | "maxBetPeriod", number>>
  >({});
  // 数据校验是否正确
  const [isValidateData, setIsValidateData] = useState(true);
  const router = useTransitionRouter();
  const [limitIsLoading, startLimitLoading] = useTransition();

  function handleChange(gameId: number) {
    if (gameId && userId) {
      startLimitLoading(async () => {
        const { code, data, message } = await getGameOdds({ gameId, userId });
        if (code === 0 && data) {
          setData(data);
        } else {
          toast.error(message);
        }
      });
    }
  }

  const handleLimitChange = (
    betType: number,
    key: "minBet" | "maxBet" | "maxBetPeriod",
    value: number,
  ) => {
    setChangedItems({
      ...changedItems,
      [betType]: {
        ...changedItems[betType],
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      const id = gameId ?? list?.[0]?.gameId;
      if (Object.keys(changedItems).length > 0 && id) {
        const { code, message } = await updateGameOdds({
          gameId: id,
          list: Object.entries(changedItems).map(([betType, item]) => ({
            ...item,
            betType: Number(betType),
          })),
          userId,
        });
        if (code === 0) {
          toast.success(message);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setChangedItems({});
          setGameId(undefined);
          setData(undefined);
        }
      }}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("limitSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="bg-background px-4 py-2">
          <Form
            list={list ?? []}
            setGameId={setGameId}
            gameId={gameId}
            handleChange={handleChange}
          />
        </div>
        <div className="max-h-[50dvh] overflow-auto rounded-sm border">
          <ScrollableTable className="relative table-fixed">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0 z-10">
                <TableHead className="w-32">{t("name")}</TableHead>
                <TableHead>{t("min")}</TableHead>
                <TableHead>{t("max")}</TableHead>
                <TableHead>{t("total")}</TableHead>
              </TableRow>
            </TableHeader>
            {limitIsLoading ? (
              <LimitSkeleton />
            ) : (
              <TableBody>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={`${item.oddsType}-${item.betType}`}>
                      <TableCell>{item.oddsLabel}</TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center gap-1">
                          <Input
                            defaultValue={item.minBet?.toString() ?? ""}
                            type="number"
                            disabled={!item.canEdit}
                            className="w-40"
                            required
                            min={item.minBetLimit ? item.minBetLimit : 1}
                            step={1}
                            onChange={(e) =>
                              handleLimitChange(
                                item.betType,
                                "minBet",
                                Number(e.target.value),
                              )
                            }
                            onBlur={(e) => {
                              setIsValidateData(e.target.reportValidity());
                            }}
                          />
                          {item.minBetLimit ? (
                            <span className="text-destructive w-20 shrink-0">
                              ({item.minBetLimit})
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center gap-1">
                          <Input
                            defaultValue={item.maxBet?.toString() ?? ""}
                            type="number"
                            required
                            min={1}
                            max={item.maxBetLimit ?? 1}
                            disabled={!item.canEdit}
                            className="w-40"
                            step={1}
                            onChange={(e) =>
                              handleLimitChange(
                                item.betType,
                                "maxBet",
                                Number(e.target.value),
                              )
                            }
                            onBlur={(e) => {
                              setIsValidateData(e.target.reportValidity());
                            }}
                          />
                          {item.maxBetLimit ? (
                            <span className="text-destructive w-20 shrink-0">
                              ({item.maxBetLimit})
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center gap-1">
                          <Input
                            defaultValue={item.maxBetPeriod?.toString() ?? ""}
                            type="number"
                            required
                            min={1}
                            max={item.maxBetPeriodLimit ?? 1}
                            disabled={!item.canEdit}
                            step={1}
                            className="w-40"
                            onChange={(e) =>
                              handleLimitChange(
                                item.betType,
                                "maxBetPeriod",
                                Number(e.target.value),
                              )
                            }
                            onBlur={(e) => {
                              setIsValidateData(e.target.reportValidity());
                            }}
                          />
                          {item.maxBetPeriodLimit ? (
                            <span className="text-destructive w-20 shrink-0">
                              ({item.maxBetPeriodLimit})
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-48 text-center">
                      {translations("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </ScrollableTable>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button
            disabled={
              isPending ||
              Object.keys(changedItems).length === 0 ||
              !isValidateData
            }
            onClick={handleSave}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Form({
  list,
  setGameId,
  gameId,
  handleChange,
}: {
  list: GameConfig[];
  setGameId: (gameId: number) => void;
  gameId: number | undefined;
  handleChange: (gameId: number) => void;
}) {
  const t = useTranslations("users.agents");
  return (
    <>
      <div className="flex items-center gap-2">
        <Label>{t("name")}</Label>
        <Select
          value={gameId?.toString() || list[0]?.gameId.toString() || ""}
          onValueChange={(value) => {
            const newGameId = Number(value);
            setGameId(newGameId);
            startTransition(() => {
              handleChange(newGameId);
            });
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder={t("placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {list.map((item) => (
              <SelectItem key={item.gameId} value={item.gameId.toString()}>
                {item.gameName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

function LimitSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={4}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
