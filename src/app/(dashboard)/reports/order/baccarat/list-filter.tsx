"use client";
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

import AmountFilter from "@/components/amount-filter";
import { DateRangeFilter } from "@/components/daterange-filter";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export default function ListFilter() {
  const t = useTranslations("report.orderlist");
  const [gameName, setGameName] = useQueryState("gameName");
  const [bettingtime, setBettingtime] = useQueryState("bettingtime");
  const [settlementstatus, setSettlementstatus] =
    useQueryState("settlementstatus");
  const [ordernumber, setOrdernumber] = useQueryState("ordernumber");
  const [issuenumber, setIssuenumber] = useQueryState("issuenumber");
  const [ministerID, setMinisterID] = useQueryState("ministerID");
  const [memberID, setMemberID] = useQueryState("memberID");
  const [roomeownerID, setRoomeownerID] = useQueryState("roomeownerID");
  const [leastlevelID, setLeastlevelID] = useQueryState("leastlevelID");

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Select
            value={bettingtime ?? ""}
            onValueChange={(value) => setBettingtime(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("bettingtime")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">百家乐</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DateRangeFilter />
      </div>

      {/* 第二行 */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("ordernumber")}</Label>
          <Input
            value={ordernumber ?? ""}
            onChange={(e) => setOrdernumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gamename")}</Label>
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
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("issuenumber")}</Label>
          <Input
            value={issuenumber ?? ""}
            onChange={(e) => setIssuenumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>

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
          <Label className="shrink-0">{t("ministerID")}</Label>
          <Input
            value={ministerID ?? ""}
            onChange={(e) => setMinisterID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("leastlevelID")}</Label>
          <Input
            value={leastlevelID ?? ""}
            onChange={(e) => setLeastlevelID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("amountfilter")}</Label>
          <AmountFilter />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("settlementstatus")}</Label>
          <Select
            value={settlementstatus ?? ""}
            onValueChange={(value) => setSettlementstatus(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">百家乐</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
