"use client";

import { DateRangeFilter } from "@/components/daterange-filter";
import { MultiSelect } from "@/components/multi-select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { approverStatusDict } from "../tools";

export function Form() {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const router = useRouter();
  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [parentAccount, setParentAccount] = useQueryState("parentAccount", {
    defaultValue: "",
  });
  //   const [approverStatusList, setApproverStatusList] = useQueryState(
  //     "approverStatusList",
  //     {
  //       defaultValue: [],
  //     },
  //   );
  const approverStatusOptions = [
    ...approverStatusDict.map((item) => ({
      value: item.value.toString(),
      label: item.label,
    })),
  ];
  const handleChange = (selected: number[]) => {
    console.info("~ selected:", selected);
    // const approverStatuslist = selected.map((item) =>
    //   Number.parseInt(item.value, 10),
    // );
    // // setApproverStatusList(approverStatuslist);
    // return approverStatuslist;
  };
  return (
    <div className="flex flex-col gap-2  bg-background py-2 px-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("dateRange")}</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("auditStatus")}</Label>
          <MultiSelect
            options={approverStatusOptions}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("parentAccount")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={parentAccount ?? ""}
            onChange={(e) => setParentAccount(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end items-start">
        <Button variant="outline">{translations("reset")}</Button>
        <Button onClick={() => router.refresh()}>
          {translations("search")}
        </Button>
      </div>
    </div>
  );
}
