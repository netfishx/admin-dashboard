"use client";

import { editGameConfig } from "@/api";
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
import { ratioAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { type ReactNode, useState, useTransition } from "react";
import { toast } from "sonner";

function RatioButton({
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
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function RatioForm() {
  const t = useTranslations("games.ratio");
  const [list, setList] = useAtom(ratioAtom);
  const router = useRouter();
  const [step, setStep] = useState(1);

  function handleEdit(num: number) {
    setList(
      list.map((item) => ({
        ...item,
        percent:
          item.percent + num < 0
            ? 0
            : item.percent + num > item.maxPercent
              ? item.maxPercent
              : item.percent + num,
      })),
    );
  }
  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("type")}</Label>
          <Select defaultValue="1" disabled>
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">百家乐</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("column")}</Label>
          <EditNumber step={step} setStep={setStep} handleEdit={handleEdit} />
        </div>
      </div>
      <div className="flex gap-2">
        <RatioButton
          onClick={async () => {
            const res = await editGameConfig(
              list.map(({ gameId, percent }) => ({
                gameId,
                percent,
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
        </RatioButton>
      </div>
    </>
  );
}
