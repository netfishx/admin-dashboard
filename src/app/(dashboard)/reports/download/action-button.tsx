"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ActionButton({ fileUrl }: { fileUrl: string }) {
  const t = useTranslations("report.download");
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "text-sm text-primary hover:text-primary/80 hover:no-underline",
      )}
    >
      {t("download")}
    </a>
  );
}
