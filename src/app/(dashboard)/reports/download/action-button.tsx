"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export function ActionButton({ fileUrl }: { fileUrl: string }) {
  const t = useTranslations("report.download");
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      className="text-primary hover:text-primary/80 text-sm"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          window.open(fileUrl);
        });
      }}
    >
      {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
      {t("download")}
    </Button>
  );
}
