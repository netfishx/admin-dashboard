"use client";
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
import Big from "big.js";
import { useTranslations } from "next-intl";

export function Detaildialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: OrderItemDetailType;
}) {
  const { open, onOpenChange, data } = props;
  const t = useTranslations("report.orderlist");

  function formatResult(result = "") {
    // Define suit mapping with colors for Tailwind
    const suitMap: Record<string, { symbol: string; color: string }> = {
      H: { symbol: "♥", color: "text-destructive" }, // Hearts
      D: { symbol: "♦", color: "text-destructive" }, // Diamonds
      C: { symbol: "♣", color: "text-foreground" }, // Clubs
      S: { symbol: "♠", color: "text-foreground" }, // Spades
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
            <span key={index} className="mr-1 inline-block">
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
          <div className="mb-1 whitespace-nowrap">
            {data?.revenueShare.map(
              (item) =>
                `${item.accountId} - ${Big(item.percent * 100).toFixed(2)}%；`,
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-20 text-center">{t("shoe")}</TableHead>
              <TableHead className="w-20 text-center">{t("play")}</TableHead>
              <TableHead className="w-40 text-center">{t("resultp")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="w-20 text-center">{data?.shoeId}</TableCell>
              <TableCell className="w-20 text-center">{data?.playId}</TableCell>
              <TableCell className="w-40 text-center">
                {formatResult(data?.result || "")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
