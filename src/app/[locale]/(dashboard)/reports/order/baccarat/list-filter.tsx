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
import DateRangeFilter from "@/components/daterange-filter";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

interface DateRange {
  from: string;
  to: string;
}

export default function ListFilter() {
  const t = useTranslations("report.orderlist");
  const [gametype, setGametype] = useQueryState("gametype", {
    defaultValue: "1",
  });
  const [gameName, setGameName] = useQueryState("gameName", {
    defaultValue: "1",
  });
  const [bettingtime, setBettingtime] = useQueryState("bettingtime", {
    defaultValue: "",
  });
  const [_startTime, setStartTime] = useQueryState("startTime", {
    defaultValue: "",
  });
  const [_endTime, setEndTime] = useQueryState("endTime", {
    defaultValue: "",
  });
  const [settlementstatus, setSettlementstatus] = useQueryState(
    "settlementstatus",
    {
      defaultValue: "",
    },
  );
  const [ordernumber, setOrdernumber] = useQueryState("ordernumber", {
    defaultValue: "",
  });
  const [issuenumber, setIssuenumber] = useQueryState("issuenumber", {
    defaultValue: "",
  });
  const [ministerID, setMinisterID] = useQueryState("ministerID", {
    defaultValue: "",
  });
  const [memberID, setMemberID] = useQueryState("memberID", {
    defaultValue: "",
  });
  const [agentID, setAgentID] = useQueryState("agentID", {
    defaultValue: "",
  });
  const [roomeownerID, setRoomeownerID] = useQueryState("roomeownerID", {
    defaultValue: "",
  });
  const [_filterAmount, setFilterAmount] = useQueryState("filterAmount", {
    defaultValue: "",
  });
  const [_filterAmountType, setFilterAmountType] = useQueryState(
    "filterAmountType",
    {
      defaultValue: "",
    },
  );
  const [leastlevelID, setLeastlevelID] = useQueryState("leastlevelID", {
    defaultValue: "",
  });

  const handleDateRangeChange = (date: DateRange) => {
    setStartTime(date.from || "");
    setEndTime(date.to || "");
  };

  const handleFilterChange = (filterType: string, amount: number | any) => {
    setFilterAmount(amount?.toString() || "");
    setFilterAmountType(filterType);
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gametype")}</Label>
          <Select
            value={gametype ?? ""}
            onValueChange={(value) => setGametype(value)}
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
        <DateRangeFilter onChange={handleDateRangeChange as any} />
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
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("ordernumber")}</Label>
          <Input
            value={ordernumber ?? ""}
            onChange={(e) => setOrdernumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>
      {/* 第二行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("issuenumber")}</Label>
          <Input
            value={issuenumber ?? ""}
            onChange={(e) => setIssuenumber(e.target.value)}
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
          <Label className="shrink-0">{t("memberID")}</Label>
          <Input
            value={memberID ?? ""}
            onChange={(e) => setMemberID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentID ?? ""}
            onChange={(e) => setAgentID(e.target.value)}
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
          <Label className="shrink-0">{t("amountfilter")}</Label>
          <AmountFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("leastlevelID")}</Label>
          <Input
            value={leastlevelID ?? ""}
            onChange={(e) => setLeastlevelID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
}
