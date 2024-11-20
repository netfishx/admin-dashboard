"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {} from "@/components/ui/select";
import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useRef } from "react";

export function ListFilter() {
  const t = useTranslations("report.member");
  const [parentAgentId, setParentAgentId] = useQueryState("parentAgentId", {
    defaultValue: "",
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "",
  });
  const [memberId, setMemberId] = useQueryState("memberId", {
    defaultValue: "",
  });

  const [memberType, setMemberType] = useQueryState<string[]>("memberType", {
    defaultValue: [],
    parse: (value) => value.split(",").filter(Boolean),
    serialize: (value) => value.join(","),
  });

  const memberTypeOptions = [
    { id: "1", label: "直属会员" },
    { id: "2", label: "非直属会员" },
  ];

  const handleMemberTypeChange = (memberTypeId: string, checked: boolean) => {
    const currentTypes = memberType || [];
    if (checked) {
      setMemberType([...currentTypes, memberTypeId].filter(Boolean));
    } else {
      setMemberType(currentTypes.filter((type) => type !== memberTypeId));
    }
  };

  const dateRangeFilterReset = useRef<
    ((start: number, end: number) => void) | null
  >(null);
  const handleDateRangeFilterReset = () => {
    const start = startOfDay(new Date()).getTime();
    const end = endOfDay(new Date()).getTime();
    dateRangeFilterReset.current?.(start, end);
  };

  const handleReset = () => {
    setParentAgentId("");
    setGameId("");
    setMemberType([]);
    handleDateRangeFilterReset();
  };

  const isMemberTypeSelected = (memberTypeId: string) => {
    return (memberType || []).includes(memberTypeId);
  };

  const router = useRouter();
  const handleSearch = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gameName")}</Label>
          <Select
            value={gameId ?? ""}
            onValueChange={(value) => setGameId(value)}
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
          <Label>{t("openTime")}</Label>
          <DateRangeFilter
            enableTimeSelect={false}
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            reset={(resetFn) => (dateRangeFilterReset.current = resetFn)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("memberId")}</Label>
          <Input
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("memberType")}</Label>
          {memberTypeOptions.map((memberType) => (
            <div key={memberType.id} className="flex items-center space-x-2">
              <Checkbox
                id={memberType.id}
                checked={isMemberTypeSelected(memberType.id)}
                onCheckedChange={(checked) =>
                  handleMemberTypeChange(memberType.id, checked as boolean)
                }
              />
              <label
                htmlFor={memberType.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {memberType.label}
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("superAgentId")}</Label>
          <Input
            value={parentAgentId ?? ""}
            onChange={(e) => setParentAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* Last row */}
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button onClick={handleSearch}>{t("search")}</Button>
          <Button>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}
