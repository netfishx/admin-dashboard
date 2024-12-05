"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Actions({
  searchParams,
}: { searchParams: { [key: string]: string | string[] } }) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const searchParamsStr = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();
  return (
    <Button
      variant="link"
      className="hover:no-underline hover:text-primary/80"
      onClick={() => {
        console.info("更多");
        router.push(
          `/reports/order/baccarat?${new URLSearchParams(searchParamsStr).toString()}`,
        );
      }}
    >
      {t("more")}
    </Button>
  );
}
