"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export function Form() {
  const t = useTranslations("system.announcement");
  const router = useRouter();

  const [agentId, setAgentId] = useQueryState("agentId", {
    defaultValue: "",
  });
  const searchData = () => {
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-background">
          <div className="flex justify-between items-center  py-2 px-4">
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("endTime")}</Label>
                <DateRangeFilter quickSetBtn={[]} />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("agentId")}</Label>
                <Input
                  placeholder={t("placeholder")}
                  value={agentId ?? ""}
                  onChange={(e) => setAgentId(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center float-right p-2">
            <Button variant="outline">{t("reset")}</Button>
            <Button onClick={searchData}>{t("search")}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
