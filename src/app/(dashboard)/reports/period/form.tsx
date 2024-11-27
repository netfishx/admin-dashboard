"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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
import { useTransition } from "react";

export function Form() {
  const t = useTranslations("report.periodlist");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [gameType, setGameType] = useQueryState("gameType", {
    defaultValue: "0",
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [issueNumber, setIssueNumber] = useQueryState("issueNumber", {
    defaultValue: "",
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-background">
        <div className="flex justify-between items-center  py-2 px-4">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("gameType")}</Label>
              <Select
                value={gameType}
                onValueChange={(value) => setGameType(value)}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("placeholderselect")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">百家乐</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("gameId")}</Label>
              <Select
                value={gameId}
                onValueChange={(value) => setGameId(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("placeholderselect")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
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
          <Button
            onClick={() => {
              startTransition(router.refresh);
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("download")}
          </Button>
        </div>
      </div>
    </div>
  );
}
