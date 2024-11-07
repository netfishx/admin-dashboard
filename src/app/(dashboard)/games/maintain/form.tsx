"use client";

import { editMaintain } from "@/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { type ReactNode, Suspense, useTransition } from "react";
import { toast } from "sonner";

function BatchButton({
  status,
  children,
}: { status: number; children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [checked] = useQueryState(
    "checked",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  return (
    <Button
      variant={status === 0 ? "destructive" : "default"}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await editMaintain({
            status,
            ids: checked,
          });
          if (res.code === 0) {
            router.refresh();
          } else {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function MaintainForm() {
  const t = useTranslations("games.maintain");
  return (
    <div className="flex items-center justify-end gap-2 bg-background py-2 px-4">
      <Suspense fallback={null}>
        <BatchButton status={0}>{t("batchOpen")}</BatchButton>
        <BatchButton status={1}>{t("batchClose")}</BatchButton>
      </Suspense>
    </div>
  );
}
