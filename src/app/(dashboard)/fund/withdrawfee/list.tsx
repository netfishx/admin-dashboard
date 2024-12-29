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
import type { WithdrawFee } from "@/lib/types";
import Big from "big.js";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function List({ data }: { data: WithdrawFee }) {
  const t = useTranslations("fund.withdrawfee");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.target as HTMLFormElement);

      const params = {
        ...data,
        percentageFee: Big(formData.get("percentageFee") as string)
          .round(2, Big.roundDown)
          .div(100)
          .toNumber(),
        fixedFee: Big(formData.get("fixedFee") as string)
          .round(2, Big.roundDown)
          .toNumber(),
      };

      const { code, message } = await saveWithdrawFee(params);
      if (code === 0) {
        toast.success(message);
        router.refresh();
      } else {
        toast.error(message);
      }
    });
  }

  const [isValid, setIsValid] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-4">
          {t("title")}
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }}
              disabled={isPending || !isValid}
            >
              {isPending && <Loader2 className="animate-spin" />}
              {t("save")}
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-background mt-19 absolute mr-2 flex h-full flex-col p-4">
        <div className="rounded-sm border">
          <Form action="" onSubmit={handleSave} ref={formRef}>
            <Table className="bg-background h-full table-fixed">
              <TableHeaderWrapper />
              <TableBody>
                <TableRow>
                  <TableCell>{data.currency}</TableCell>

                  <TableCell className="text-center">
                    <Input
                      type="number"
                      name="fixedFee"
                      defaultValue={Big(data.fixedFee)
                        .round(2, Big.roundDown)
                        .toString()}
                      min={0}
                      step={0.01}
                      required
                      onChange={(e) => {
                        setIsValid(e.target.checkValidity());
                      }}
                      onBlur={(e) => {
                        const state = e.target.reportValidity();
                        if (!state) {
                          e.target.focus();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="number"
                      name="percentageFee"
                      defaultValue={Big(data.percentageFee)
                        .times(100)
                        .round(2)
                        .toString()}
                      min={0}
                      max={100}
                      step={0.01}
                      required
                      onChange={(e) => {
                        setIsValid(e.target.checkValidity());
                      }}
                      onBlur={(e) => {
                        const state = e.target.reportValidity();
                        if (!state) {
                          e.target.focus();
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Form>
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
