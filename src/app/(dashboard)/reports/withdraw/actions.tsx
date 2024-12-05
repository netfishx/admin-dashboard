"use client";
import { Button } from "@/components/ui/button";
import type { WithdrawReport } from "@/lib/types";
import { useRouter } from "next/navigation";

export function Actions({ item }: { item: WithdrawReport }) {
  const router = useRouter();

  return (
    <>
      {item.withdrawHash && (
        <Button
          variant="link"
          size="icon"
          className="block w-[100px] truncate overflow-hidden whitespace-nowrap"
          onClick={() => {
            router.push(
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
