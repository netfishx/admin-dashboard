"use client";

import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function Form() {
  const t = useTranslations("users.agents");
  const [ip, setIp] = useQueryState("ip", { defaultValue: "" });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSearch() {
    router.refresh();
  }
  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">登录时间</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">登录IP</Label>
          <Input value={ip} onChange={(e) => setIp(e.target.value)} />
        </div>
      </div>
      <div>
        <Button onClick={() => startTransition(handleSearch)}>
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("search")}
        </Button>
      </div>
    </>
  );
}
