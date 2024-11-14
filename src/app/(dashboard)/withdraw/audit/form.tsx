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
  const t = useTranslations("withdraw.audit");
  const translations = useTranslations();
  const router = useRouter();
  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [parentAccount, setParentAccount] = useQueryState("parentAccount", {
    defaultValue: "",
  });

  const [gameTypeName, setGameTypeName] = useQueryState("gameTypeName", {
    defaultValue: "1",
  });
  const [gameName, setGameName] = useQueryState("gameName", {
    defaultValue: "",
  });

  return (
    <div className="flex flex-col gap-2  bg-background py-2 px-4">
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
          <Label className="shrink-0">{t("dateRange")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("memberId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("orderNo")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={parentAccount ?? ""}
            onChange={(e) => setParentAccount(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("businessOrderNo")}</Label>
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
