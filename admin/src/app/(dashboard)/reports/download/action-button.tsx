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
        "text-primary text-sm hover:text-primary/80 hover:no-underline",
      )}
    >
      {t("download")}
    </a>
  );
}
