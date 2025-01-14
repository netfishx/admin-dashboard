"use client";
import { Poker } from "@/components/poker";
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
    // Split player and banker data
    const [player, banker] = result.split(",");

    // Helper function to format cards
    const formatCards = (cards = "") =>
      cards
        .split("-")
        .filter((card) => card !== "XX" && card.length > 1)
        .map((card) => {
          return (
            <span key={card} className="mr-1 inline-block">
              <Poker poker={card} />
            </span>
          );
        });

    // Generate formatted JSX
    const formattedPlayer = player ? (
      <span>闲 {formatCards(player)}</span>
    ) : null;

    const formattedBanker = banker ? (
      <span>庄 {formatCards(banker)}</span>
    ) : null;

    return (
      <>
        {formattedBanker};{formattedPlayer}
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("detail")}</DialogTitle>
        </DialogHeader>
        <div className="bg-muted text-muted-foreground rounded-sm p-2 text-center font-medium">
          {t("shareDetail")}
        </div>
        <ScrollArea className="w-[846px]">
          <div className="mb-1 whitespace-nowrap text-center">
            {data?.revenueShare.map(
              (item) =>
                `${item.accountId} - ${Big(item.percent * 100).toFixed(2)}%；`,
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Table className="table-fixed rounded-md border">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-12 text-center">{t("shoe")}</TableHead>
              <TableHead className="w-12 text-center">{t("play")}</TableHead>
              <TableHead className="w-40 text-center">{t("resultp")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="text-center">{data?.shoeId}</TableCell>
              <TableCell className="text-center">{data?.playId}</TableCell>
              <TableCell className="text-center">
                {formatResult(data?.result || "")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
