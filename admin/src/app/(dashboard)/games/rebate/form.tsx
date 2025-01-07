"use client";
import { editDefaultGameConfig } from "@/api";
import { EditNumber } from "@/components/edit-number";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rebateAtom } from "@/store";
import { Big } from "big.js";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { type ReactNode, useState, useTransition } from "react";
import { toast } from "sonner";

function RebateButton({
  children,
  onClick,
  ...props
}: { children: ReactNode; onClick: () => void } & ButtonProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      disabled={isPending}
      onClick={() => {
        startTransition(onClick);
      }}
    >
      {isPending ? <Loader2 className="animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function RebateForm() {
  const t = useTranslations("games.rebate");
  const [list, setList] = useAtom(rebateAtom);
  const router = useTransitionRouter();
  const [step, setStep] = useState(1);

  function handleEdit(num: number) {
    setList(
      list.map((item) => ({
        ...item,
        backRate: Big(item.backRate).add(num).lt(0)
          ? "0"
          : item.maxBackRate
            ? Big(item.backRate).add(num).gt(item.maxBackRate)
              ? item.maxBackRate
              : Big(item.backRate).add(num).toString()
            : Big(item.backRate).add(num).toString(),
      })),
    );
  }
  return (
    <>
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("type")}</Label>
          <Select defaultValue="1" disabled>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">百家乐</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("column")}</Label>
          <EditNumber
            step={step}
            setStep={setStep}
            handleEdit={handleEdit}
            limit={0.01}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <RebateButton
          onClick={async () => {
            const res = await editDefaultGameConfig(
              list.map(({ gameId, backRate }) => ({
                gameId,
                backRate,
              })),
            );
            if (res.code === 0) {
              toast.success(t("success"));
              router.refresh();
            } else {
              toast.error(res.message ?? t("failed"));
            }
          }}
        >
          {t("save")}
        </RebateButton>
      </div>
    </>
  );
}
