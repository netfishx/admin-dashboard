"use client";
import { saveWithdrawFee } from "@/api";
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
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function List({ data }: { data: WithdrawFeeList }) {
  const t = useTranslations("fund.withdrawfee");
  const translations = useTranslations();
  const [feeList, setFeeList] = useState<WithdrawFeeList>(data);

  const [currentParams, setCurrentParams] = useState({});

  const [isPending, startTransition] = useTransition();

  async function handleSave() {
    if (Object.keys(currentParams).length === 0) {
      return;
    }
    startTransition(async () => {
      const percentageFeeParam = Big(
        (currentParams as WithdrawFeeList).percentageFee,
      )
        .round(2)
        .div(100)
        .toNumber();
      const fixedFeeParam = Big((currentParams as WithdrawFeeList).fixedFee)
        .round(2)
        .toNumber();

      const params = {
        ...currentParams,
        percentageFee: percentageFeeParam,
        fixedFee: fixedFeeParam,
      };

      const { code, message } = await saveWithdrawFee(
        params as WithdrawFeeList,
      );
      if (code === 0) {
        toast.success(message);
        window.location.reload();
      } else {
        toast.error(message);
      }
    });
  }

  // 通用的更新函数
  function handleFieldChange<K extends keyof WithdrawFeeList>(
    field: K,
    value: WithdrawFeeList[K],
  ) {
    const updatedItem = { ...feeList, [field]: value };
    setFeeList(updatedItem);
    setCurrentParams(updatedItem);
  }

  const handleFixedChange = (value: number) =>
    handleFieldChange("fixedFee", value);

  const handlePercentageChange = (value: number) =>
    handleFieldChange("percentageFee", value);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          {t("title")}
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("save")}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col bg-background p-4 absolute mt-19 mr-2">
        <div className="rounded-sm border">
          <Table className="table-fixed bg-background h-full">
            <TableHeaderWrapper />
            {/* <Suspense fallback={<TableBodySkeleton />}> */}
            <TableBody>
              {feeList ? (
                <TableRow>
                  <TableCell>
                    {feeList.currency}
                    {/* <Input
                      type="text"
                      value={feeList.currency}
                      onChange={(e) => {
                          handleCurrencyChange(index, e.target.value);
                        }}
                      /> */}
                  </TableCell>

                  <TableCell className="text-center">
                    <Input
                      type="number"
                      value={Big(feeList.fixedFee).round(2).toString()}
                      min={0}
                      step={0.01}
                      onChange={(e) => {
                        handleFixedChange(Number(e.target.value));
                      }}
                      onBlur={(e) => {
                        e.target.reportValidity();
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="number"
                      value={Big(feeList.percentageFee).round(2).toString()}
                      min={0}
                      max={100}
                      step={0.01}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= 100) {
                          handlePercentageChange(value);
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-40 text-center">
                    {translations("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {/* </Suspense> */}
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
        <TableHead className="w-24">{t("currency")}</TableHead>
        <TableHead className="w-48 text-center">{t("fixedFee")}</TableHead>
        <TableHead className="w-48 text-center">{t("percentageFee")}</TableHead>
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
