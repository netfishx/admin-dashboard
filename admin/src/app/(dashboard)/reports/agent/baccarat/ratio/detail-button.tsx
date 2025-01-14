import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DetailButton({
  parentAgentId,
  searchParams,
}: {
  parentAgentId: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const t = useTranslations("report.orderlist");
  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:no-underline"
        asChild
      >
        <Link
          href={{
            pathname: "/reports/agent/baccarat/ratio",
            query: {
              ...searchParams,
              parentAgentId,
            },
          }}
        >
          {t("more")}
        </Link>
      </Button>
    </div>
  );
}
