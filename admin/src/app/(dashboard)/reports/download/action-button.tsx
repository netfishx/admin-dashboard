"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ActionButton({ fileUrl }: { fileUrl: string }) {
  const t = useTranslations("report.download");
  return (
    <a
      href={fileUrl}
      rel="noreferrer"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "text-primary hover:text-primary/80 text-sm hover:no-underline",
      )}
    >
      {t("download")}
    </a>
  );
}
