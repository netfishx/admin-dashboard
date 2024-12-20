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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";
export function ListFilter({
  hasSearchPermission,
}: {
  hasSearchPermission: boolean;
}) {
  const t = useTranslations("report.agent");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [agentId, setAgentId] = useQueryState("agentId", {
    defaultValue: "",
  });
  const [roomId, setRoomId] = useQueryState("roomId", {
    defaultValue: "all",
  });

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const handleReset = () => {
    router.replace("/reports/agent/guandan");
  };

  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      {/* First row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>{t("pickdate")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
        {hasSearchPermission && (
          <div className="flex items-center gap-4">
            <Label className="shrink-0">{t("agentID")}</Label>
            <Input
              value={agentId || ""}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
      </div>

      {/* Second row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("roomType")}</Label>
          <Select
            value={roomId || ""}
            onValueChange={(value) => setRoomId(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="1">{t("gameHall")}</SelectItem>
              <SelectItem value="2">{t("club")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Last row */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("search")}
          </Button>
          {/* <Button disabled={isPending}>{t("download")}</Button> */}
        </div>
      </div>
    </div>
  );
}
