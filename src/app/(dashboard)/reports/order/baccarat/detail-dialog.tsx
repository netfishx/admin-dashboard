"use client";
import { getOrderDetail } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderItemDetailType, OrderReportsRecord } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";

interface Dialogprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: OrderReportsRecord;
}

export function Detaildialog(props: Dialogprops) {
  const { open, onOpenChange, item } = props;
  const [data, setData] = useState<OrderItemDetailType>();
  const t = useTranslations("report.orderlist");
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (open) {
      getOrderDetail({ id: item.id }).then((res) => {
        setData(res?.data);
      });
    }
  }, [open]);

  function formatResult(result = "") {
    // Define suit mapping with colors for Tailwind
    const suitMap: Record<string, { symbol: string; color: string }> = {
      H: { symbol: "♥", color: "text-red-500" }, // Hearts
      D: { symbol: "♦", color: "text-red-500" }, // Diamonds
      C: { symbol: "♣", color: "text-black" }, // Clubs
      S: { symbol: "♠", color: "text-black" }, // Spades
    };

    // Split player and banker data
    const [player, banker] = result.split(",");

    // Helper function to format cards
    const formatCards = (cards = "") =>
      cards
        .split("-")
        .filter((card) => card !== "XX" && card.length > 1)
        .map((card, index) => {
          const suit = suitMap[card[0]];
          if (!suit) {
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            return <span key={index}>{card}</span>; // Fallback for invalid cards
          }
          const value = card.slice(1);
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <span key={index} className="inline-block mr-1">
              <span className={suit.color}>{suit.symbol}</span>
              {value}
            </span>
          );
        });

    // Generate formatted JSX
    const formattedPlayer = player ? <div>闲 {formatCards(player)}</div> : null;

    const formattedBanker = banker ? <div>庄 {formatCards(banker)}</div> : null;

    return (
      <div className="flex gap-2">
        {formattedBanker};{formattedPlayer}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("detail")}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">{t("shareDetail")}</div>
        <ScrollArea className="w-[450px]">
          <Suspense fallback={<Skeleton />}>
            <div className="whitespace-nowrap mb-1">
              {data?.revenueShare.map(
                (item) => `${item.accountId} - ${item.percent * 100}%；`,
              )}
            </div>
          </Suspense>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Suspense fallback={<TableSkeleton length={1} colSpan={3} />}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-20 text-center">{t("shoe")}</TableHead>
                <TableHead className="w-20 text-center">{t("play")}</TableHead>
                <TableHead className="w-40 text-center">
                  {t("resultp")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="w-20 text-center">
                  {data?.shoeId}
                </TableCell>
                <TableCell className="w-20 text-center">
                  {data?.playId}
                </TableCell>
                <TableCell className="w-40 text-center">
                  {formatResult(data?.result || "")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
