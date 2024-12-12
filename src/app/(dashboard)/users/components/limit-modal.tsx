"use client";

import { getGameConfig, getGameOdds, updateGameOdds } from "@/api";
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
import type { GameConfig, GameOdds } from "@/lib/types";
import { limitModalAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function LimitModal({ userId }: { userId: string }) {
  const translations = useTranslations();
  const [open, setOpen] = useAtom(limitModalAtom);
  const t = useTranslations("users.agents");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState<GameConfig[]>([]);
  const [gameId, setGameId] = useState<number>();
  const [data, setData] = useState<GameOdds[]>([]);
  const [initialData, setInitialData] = useState<GameOdds[]>([]);
  // 数据校验是否正确
  const [isValidataData, setIsValidataData] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      getGameConfig().then(({ code, data, message }) => {
        setLoading(false);
        if (code === 0 && data) {
          const list =
            data?.filter((item) => item.status === 1 && item.gameType === 61) ??
            [];
          setList(list);
          setGameId(list[0]?.gameId ?? 0);
        } else {
          toast.error(message);
        }
      });
    }
  }, [open, userId]);

  useEffect(() => {
    if (gameId && userId && open) {
      setLoading(true);
      getGameOdds({ gameId, userId }).then(({ code, data, message }) => {
        setLoading(false);
        if (code === 0 && data) {
          setData(data ?? []);
          setInitialData(data ?? []);
        } else {
          toast.error(message);
        }
      });
    }
  }, [gameId, userId, open]);

  const handleLimitChange = (groupId: number, key: string, value: string) => {
    setData(
      data.map((item) =>
        item.groupId === groupId ? { ...item, [key]: value } : item,
      ),
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      if (gameId) {
        const changedItems = data.filter((item) => {
          const initialItem = initialData.find(
            (i) => i.groupId === item.groupId,
          );
          return (
            initialItem &&
            (initialItem.minBet !== item.minBet ||
              initialItem.maxBet !== item.maxBet ||
              initialItem.maxBetPeriod !== item.maxBetPeriod)
          );
        });

        const { code, message } = await updateGameOdds({
          gameId,
          list: changedItems,
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

  const hasChanges = () => {
    return data.some((item) => {
      const initialItem = initialData.find((i) => i.groupId === item.groupId);
      return (
        initialItem &&
        (initialItem.minBet !== item.minBet ||
          initialItem.maxBet !== item.maxBet ||
          initialItem.maxBetPeriod !== item.maxBetPeriod)
      );
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setGameId(undefined);
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
        <div className="py-2 px-4 bg-background">
          <Suspense fallback={<Skeleton />}>
            <Form list={list} setGameId={setGameId} gameId={gameId} />
          </Suspense>
        </div>
        <div className="border rounded-sm overflow-auto max-h-[50dvh]">
          <ScrollableTable className="relative table-fixed">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0">
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("min")}</TableHead>
                <TableHead>{t("max")}</TableHead>
                <TableHead>{t("total")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <LimitSkeleton />
            ) : (
              <TableBody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={`${item.oddsType}-${item.betType}`}>
                      <TableCell>{item.oddsLabel}</TableCell>
                      <TableCell>
                        <Input
                          value={item.minBet?.toString() ?? ""}
                          type="number"
                          disabled={!item.canEdit}
                          required
                          min={1}
                          step={1}
                          onChange={(e) =>
                            handleLimitChange(
                              item.groupId ?? 0,
                              "minBet",
                              e.target.value,
                            )
                          }
                          onBlur={(e) => {
                            setIsValidataData(e.target.reportValidity());
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center gap-1">
                          <Input
                            value={item.maxBet?.toString() ?? ""}
                            type="number"
                            required
                            min={1}
                            max={item.maxBetLimit ?? 1}
                            disabled={!item.canEdit}
                            step={1}
                            onChange={(e) =>
                              handleLimitChange(
                                item.groupId ?? 0,
                                "maxBet",
                                e.target.value,
                              )
                            }
                            onBlur={(e) => {
                              setIsValidataData(e.target.reportValidity());
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
                            value={item.maxBetPeriod?.toString() ?? ""}
                            type="number"
                            required
                            min={1}
                            max={item.maxBetPeriodLimit ?? 1}
                            disabled={!item.canEdit}
                            step={1}
                            onChange={(e) =>
                              handleLimitChange(
                                item.groupId ?? 0,
                                "maxBetPeriod",
                                e.target.value,
                              )
                            }
                            onBlur={(e) => {
                              setIsValidataData(e.target.reportValidity());
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
                    <TableCell colSpan={4} className="text-center h-40">
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
            disabled={isPending || !hasChanges() || !isValidataData}
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
      <div className="flex gap-2 items-center">
        <Label>{t("name")}</Label>
        <Select
          value={gameId?.toString() ?? ""}
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
