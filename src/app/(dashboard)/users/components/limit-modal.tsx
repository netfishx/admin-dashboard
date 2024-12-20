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
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function LimitModal({ userId }: { userId: string }) {
  const translations = useTranslations();
  const [open, setOpen] = useAtom(limitModalAtom);
  const t = useTranslations("users.agents");
  const [isPending, startTransition] = useTransition();
  const list = useAtomValue(limitGamesAtom);
  const [gameId, setGameId] = useState<number>();
  const [data, setData] = useAtom(limitDataAtom);
  const [changedItems, setChangedItems] = useState<
    Record<number, Record<"minBet" | "maxBet" | "maxBetPeriod", number>>
  >({});
  // 数据校验是否正确
  const [isValidateData, setIsValidateData] = useState(false);
  const router = useRouter();
  const [limitIsLoading, startLimitLoading] = useTransition();

  useEffect(() => {
    setGameId(list?.[0]?.gameId);
  }, [list]);

  useEffect(() => {
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
  }, [gameId, userId, setData]);

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
      if (gameId && Object.keys(changedItems).length > 0) {
        const { code, message } = await updateGameOdds({
          gameId,
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
      <DialogContent
        className="max-w-5xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("limitSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="bg-background px-4 py-2">
          <Form list={list ?? []} setGameId={setGameId} gameId={gameId} />
        </div>
        <div className="max-h-[50dvh] overflow-auto rounded-sm border">
          <ScrollableTable className="relative table-fixed">
            <TableHeader>
              <TableRow className="sticky top-0 bg-muted z-10">
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
                {/* biome-ignore lint/style/useExplicitLengthCheck: <explanation> */}
                {data?.length ? (
                  data.map((item) => (
                    <TableRow key={`${item.oddsType}-${item.betType}`}>
                      <TableCell>{item.oddsLabel}</TableCell>
                      <TableCell>
                        <Input
                          defaultValue={item.minBet?.toString() ?? ""}
                          type="number"
                          disabled={!item.canEdit}
                          className="w-40"
                          required
                          min={1}
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
                          <span className="text-destructive">
                            ({item.maxBetLimit})
                          </span>
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
                          <span className="text-destructive">
                            ({item.maxBetPeriodLimit})
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-40 text-center">
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
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
}: {
  list: GameConfig[];
  setGameId: (gameId: number) => void;
  gameId: number | undefined;
}) {
  const t = useTranslations("users.agents");
  return (
    <>
      <div className="flex items-center gap-2">
        <Label>{t("name")}</Label>
        <Select
          value={gameId?.toString() || list[0]?.gameId.toString() || ""}
          onValueChange={(value) => setGameId(Number(value))}
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
