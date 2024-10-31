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
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { TabsTypes } from "./defiend";

export default function form() {
  const t = useTranslations("report.agent");
  const [gametype, setGameType] = useQueryState("gametype");
  const [gameName, setGameName] = useQueryState("gameName");
  const [memberID, setMemberID] = useQueryState("memberID");
  const [roomeownerID, setRoomeownerID] = useQueryState("roomeownerID");
  const [uperagentID, setUperagentID] = useQueryState("uperagentID");
  const [leastlevelID, setLeastlevelID] = useQueryState("leastlevelID");
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabsType = searchParams.get("tabsType");

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gametype")}</Label>
          <Select
            value={gametype ?? ""}
            onValueChange={(value) => setGameType(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">百家乐01</SelectItem>
              <SelectItem value="2">百家乐02</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gameName")}</Label>
          <Select
            value={gameName ?? ""}
            onValueChange={(value) => setGameName(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">百家乐01</SelectItem>
              <SelectItem value="2">百家乐02</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {tabsType === TabsTypes.RATIO && (
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("drawtime")}</Label>
            <DateRangeFilter />
          </div>
        )}
        {tabsType === TabsTypes.MEMBER && (
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("drawtime")}</Label>
            <DateRangeFilter />
          </div>
        )}

      </div>

      {/* 第二行 */}
      {tabsType === TabsTypes.RATIO && (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("memberID")}</Label>
            <Input
              value={memberID ?? ""}
              onChange={(e) => setMemberID(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("roomeownerID")}</Label>
            <Input
              value={roomeownerID ?? ""}
              onChange={(e) => setRoomeownerID(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("uperagentID")}</Label>
            <Input
              value={uperagentID ?? ""}
              onChange={(e) => setUperagentID(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        </div>
      )}
      {tabsType === TabsTypes.MEMBER && (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("leastlevelID")}</Label>
            <Input
              value={leastlevelID ?? ""}
              onChange={(e) => setLeastlevelID(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        </div>
      )}

      {/* 第四行 */}
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
            {t("reset")}
          </Button>
          <Button>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
}
