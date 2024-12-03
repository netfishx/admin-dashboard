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
  Table,
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
  const router = useRouter();
  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      getGameConfig().then(({ data }) => {
        console.info(data);
        const list = data?.filter((item) => item.status === 1) ?? [];
        setList(list);
        setGameId(list[0]?.gameId ?? 0);
        setLoading(false);
      });
    }
  }, [open, userId]);
  useEffect(() => {
    if (gameId) {
      setLoading(true);
      getGameOdds({ gameId }).then(({ data }) => {
        console.info(data);
        setData(data ?? []);
        setLoading(false);
      });
    }
  }, [gameId]);

  const handleLimitChange = (
    oddsType: number,
    betType: number,
    groupId: number,
    key: string,
    value: number,
  ) => {
    console.info(oddsType, betType, groupId, key, value);
    setData(
      data.map((item) =>
        item.groupId === groupId ? { ...item, [key]: value } : item,
      ),
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      if (gameId) {
        const { code, message } = await updateGameOdds({ gameId, list: data });
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
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
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
        <div className="border rounded-sm">
          <Table>
            <TableHeader className="w-full table">
              <TableRow className="bg-muted">
                <TableHead className="w-[160px]">{t("name")}</TableHead>
                <TableHead className="w-[240px]">{t("min")}</TableHead>
                <TableHead className="w-[280px]">{t("max")}</TableHead>
                <TableHead className="w-[300px]">{t("total")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <LimitSkeleton />
            ) : (
              <TableBody className="max-h-[370px] overflow-auto w-full block">
                {data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={`${item.oddsType}-${item.betType}`}>
                      <TableCell className="w-[160px]">
                        {item.oddsLabel}
                      </TableCell>
                      <TableCell className="w-[240px]">
                        <Input
                          value={item.minBet}
                          className="inline-block max-w-32 min-w-28"
                          type="number"
                          disabled={!item.canEdit}
                          min={1}
                          onChange={(e) =>
                            handleLimitChange(
                              item.oddsType,
                              item.betType,
                              item.groupId ?? 0,
                              "minBet",
                              Number(e.target.value),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="w-[280px]">
                        <Input
                          value={item.maxBet}
                          className="inline-block max-w-32 min-w-28"
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
                        />
                        <span className="text-destructive">
                          ({item.maxBetLimit})
                        </span>
                      </TableCell>
                      <TableCell className="w-[300px]">
                        <Input
                          value={item.maxBetPeriod}
                          className="inline-block max-w-32 min-w-28"
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
                        />
                        <span className="text-destructive">
                          ({item.maxBetPeriodLimit})
                        </span>
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
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button disabled={isPending} onClick={handleSave}>
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
