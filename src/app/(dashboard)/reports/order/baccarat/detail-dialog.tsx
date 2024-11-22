"use client";
import { getOrderDetail } from "@/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderItemDetailType } from "@/lib/types";
import { useEffect, useState } from "react";

interface Dialogprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Detaildialog(props: Dialogprops) {
  const { open, onOpenChange } = props;
  const [data, setData] = useState<OrderItemDetailType>();
  useEffect(() => {
    if (open) {
      getOrderDetail({ id: "1731907697706" }).then((res) => {
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
          <DialogTitle>详情</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">占成明细</div>
        <ScrollArea className="w-[450px]">
          <div className="whitespace-nowrap mb-1">
            {data?.revenueShare.map(
              (item) => `${item.accountId} - ${item.percent * 100}%；`,
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* <div>靴数: 8</div>
        <div>牌局结果: 庄:♣3 ♣7; ♦2 ♠6</div> */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-20 text-center">靴数</TableHead>
              <TableHead className="w-20 text-center">局数</TableHead>
              <TableHead className="w-40 text-center">牌局结果</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-20 text-center">{data?.shoeId}</TableCell>
              <TableCell className="w-20 text-center">{data?.playId}</TableCell>
              <TableCell className="w-40 text-center">
                {formatResult(data?.result || "")}
                {/* {data?.result?.split(",")} */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
