"use client";
import { getWithdrawFeeList, saveWithdrawFee } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WithdrawFeeList } from "@/lib/types";
import Big from "big.js";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

export function List() {
  const router = useRouter();
  const t = useTranslations("fund.withdrawfee");
  const translations = useTranslations();
  const [feeList, setFeeList] = useState<WithdrawFeeList[]>([]);

  useEffect(() => {
    getWithdrawFeeList().then(({ data }) => {
      setFeeList(data ?? []);
    });
  }, []);
  const [currentParams, setCurrentParams] = useState({});

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (Object.keys(currentParams).length === 0) {
      return;
    }
    setLoading(true);
    const res = await saveWithdrawFee(currentParams as WithdrawFeeList);
    setLoading(false);
    if (res.code === 0) {
      toast.success(res.message);
      router.refresh();
    }
  }

  function handleFixedChange(index: number, value: number) {
    const updatedItem = { ...feeList[index], fixedFee: value };
    setFeeList(feeList.map((item, i) => (i === index ? updatedItem : item)));
    setCurrentParams(updatedItem);
  }

  function handlePercentageChange(index: number, value: number) {
    const updatedItem = { ...feeList[index], percentageFee: value };
    setFeeList(feeList.map((item, i) => (i === index ? updatedItem : item)));
    setCurrentParams(updatedItem);
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex flex-col gap-2 bg-background px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {t("title")}
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("save")}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-2 bg-background p-2">
        <div className="rounded-sm border">
          <Table>
            <TableHeaderWrapper />
            <Suspense fallback={<TableBodySkeleton />}>
              <TableBody>
                {feeList && feeList.length > 0 ? (
                  feeList.map((item, index) => (
                    <TableRow key={item.currency}>
                      <TableCell className="w-24 text-center">
                        {item.currency}
                      </TableCell>

                      <TableCell className="w-24 text-center">
                        <Input
                          type="number"
                          value={Number(item.fixedFee).toFixed(2)}
                          min={0}
                          step={0.01}
                          onChange={(e) => {
                            handleFixedChange(index, Number(e.target.value));
                          }}
                          onBlur={(e) => {
                            e.target.reportValidity();
                          }}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={Big(item.percentageFee)
                            .times(100)
                            .round(2)
                            .toNumber()}
                          min={0}
                          step={0.01}
                          onChange={(e) => {
                            handlePercentageChange(
                              index,
                              Number(e.target.value),
                            );
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-40 text-center">
                      {translations("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Suspense>
          </Table>
        </div>
      </div>
    </div>
  );
}
export function TableHeaderWrapper() {
  const t = useTranslations("fund.withdrawfee");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-24 min-w-24 text-center">
          {t("currency")}
        </TableHead>
        <TableHead className="text-center">{t("fixedFee")}</TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("percentageFee")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={3}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
