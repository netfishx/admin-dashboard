"use client";

import { editGameConfig } from "@/api";
import { Button } from "@/components/ui/button";
import { holdStatusAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function FlyOrderForm() {
  const t = useTranslations("games.flyorder");
  const holdStatus = useAtomValue(holdStatusAtom);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <span className="text-sm font-medium">{t("title")}</span>
      <span>
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await editGameConfig(holdStatus);
              if (res.code === 0) {
                toast.success(t("success"));
                router.refresh();
              } else {
                toast.error(res.message ?? t("failed"));
              }
            });
          }}
        >
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {t("save")}
        </Button>
      </span>
    </>
  );
}
