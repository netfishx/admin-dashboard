"use client";
import { Button } from "@/components/ui/button";
import type { RechargeReport } from "@/lib/types";

export function Actions({ item }: { item: RechargeReport }) {
  return (
    <>
      {item.rechargeHash && (
        <Button
          variant="link"
          size="icon"
          className="block min-w-[250px] overflow-hidden truncate whitespace-nowrap"
          onClick={() => {
            window.open(
              `https://tronscan.org/#/transaction/${item.rechargeHash}`,
            );
          }}
        >
          {item.rechargeHash}
        </Button>
      )}
    </>
  );
}
