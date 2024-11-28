"use client";
import { SupplierDialog } from "@/app/(dashboard)/games/supplier/dialog";
import { Button } from "@/components/ui/button";
import type { GameInfo } from "@/lib/types";
import { gamesSupplierDialogAtom, supplierConfigAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function Add({ games }: { games: GameInfo[] }) {
  const t = useTranslations("games.supplier");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const [data, setData] = useAtom(supplierConfigAtom);
  return (
    <>
      <SupplierDialog key={data?.id} games={games} />
      <Button
        size="sm"
        onClick={() => {
          setData(undefined);
          setOpen(true);
        }}
      >
        {t("add")}
      </Button>
    </>
  );
}
