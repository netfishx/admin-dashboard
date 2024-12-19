"use client";
import { Button } from "@/components/ui/button";
import type { WithdrawReport } from "@/lib/types";

export function Actions({ item }: { item: WithdrawReport }) {
  return (
    <>
      {item.withdrawHash && (
        <Button
          variant="link"
          size="icon"
          className="block w-[100px] overflow-hidden truncate whitespace-nowrap"
          onClick={() => {
            window.open(
              `https://tronscan.org/#/transaction/${item.withdrawHash}`,
            );
          }}
        >
          {item.withdrawHash}
        </Button>
      )}
    </>
  );
}
