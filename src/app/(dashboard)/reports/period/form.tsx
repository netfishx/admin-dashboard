"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export function Form() {
  const t = useTranslations("report.periodlist");

  const router = useRouter();
  const [gameTypeName, setGameTypeName] = useQueryState("gameTypeName", {
    defaultValue: "1",
  });
  const [gameName, setGameName] = useQueryState("gameName", {
    defaultValue: "",
  });
  const [issueNumber, setIssueNumber] = useQueryState("issueNumber", {
    defaultValue: "",
  });

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-background">
          <div className="flex justify-between items-center  py-2 px-4">
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("gameTypeName")}</Label>
                <Select
                  value={gameTypeName ?? ""}
                  onValueChange={(value) => setGameTypeName(value)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder={t("placeholderselect")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">百家乐</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("gameName")}</Label>
                <Select
                  value={gameName ?? ""}
                  onValueChange={(value) => setGameName(value)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder={t("placeholderselect")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">百家乐01</SelectItem>
                    <SelectItem value="1">百家乐02</SelectItem>
                    <SelectItem value="2">百家乐03</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("issueNumber")}</Label>
                <Input
                  placeholder={t("placeholderinput")}
                  value={issueNumber ?? ""}
                  onChange={(e) => setIssueNumber(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("openTime")}</Label>
                <DateRangeFilter
                  quickSetBtn={["today", "yesterday"]}
                  enableTimeSelect={false}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center float-right p-2">
            <Button variant="outline">{t("reset")}</Button>
            <Button onClick={() => router.refresh()}>{t("search")}</Button>
            <Button variant="outline">{t("download")}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
