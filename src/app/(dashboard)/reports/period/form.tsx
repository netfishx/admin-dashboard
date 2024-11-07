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
  const [gameType, setGameType] = useQueryState("gameType", {
    defaultValue: "1",
  });
  const [roomName, setRoomName] = useQueryState("roomName", {
    defaultValue: "1",
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "",
  });

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-background">
          <div className="flex justify-between items-center  py-2 px-4">
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("gameType")}</Label>
                <Select
                  value={gameType ?? ""}
                  onValueChange={(value) => setGameType(value)}
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
                  value={roomName ?? ""}
                  onValueChange={(value) => setRoomName(value)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder={t("placeholderselect")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">百家乐01</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("gameId")}</Label>
                <Input
                  placeholder={t("placeholderinput")}
                  value={gameId ?? ""}
                  onChange={(e) => setGameId(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("openTime")}</Label>
                <DateRangeFilter quickSetBtn={["today", "yesterday"]} />
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
