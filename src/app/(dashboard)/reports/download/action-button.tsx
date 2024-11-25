"use client";

import { getDownloadUrl } from "@/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export function ActionButton({ id }: { id: string }) {
  const t = useTranslations("report.download");
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      className="text-primary hover:text-primary/80 text-sm"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const { data } = await getDownloadUrl({ id });
          window.open(data?.url);
        });
      }}
    >
      {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
      {t("download")}
    </Button>
  );
}
