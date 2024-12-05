"use client";
import { Button } from "@/components/ui/button";
import type { RechargeReport } from "@/lib/types";
import { useRouter } from "next/navigation";

export function Actions({ item }: { item: RechargeReport }) {
  const router = useRouter();

  return (
    <>
      {item.rechargeHash && (
        <Button
          variant="link"
          size="icon"
          className="block w-[100px] truncate overflow-hidden whitespace-nowrap"
          onClick={() => {
            router.push(
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
