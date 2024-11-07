"use client";
import { saveAnnouncement } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TimeRange } from "./time-range";

export function AddModal() {
  const t = useTranslations("system.announcement");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useAtom(contentEditModalAtom);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const data = useAtomValue(contentModalDataAtom);
  const editModalTitle = useAtomValue(editModalTitleAtom);
  console.info("🌸 ~ data:", data);
  const handleClickAdd = async () => {
    const addParams = {
      type,
      language,
      content,
      status: "0",
      startTime: new Date(startTime).getTime().toString() || "",
      endTime: new Date(endTime).getTime().toString() || "",
      createTime: Date.now().toString(),
    };
    const res = await saveAnnouncement(addParams);
    setOpen(false);
  };

  // 回调函数，用于接收子组件传递的时间数据
  const handleDateRangeChange = (start: string, end: string) => {
    console.info("Selected date range:", start, end);
    setStartTime(start);
    setEndTime(end);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{editModalTitle}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("announcementType")}
            </Label>
            <Select
              defaultValue="1"
              value={type}
              onValueChange={(value) => setType(value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t("platformAnnouncement")}</SelectItem>
                <SelectItem value="2">{t("agentAnnouncement")}</SelectItem>
                <SelectItem value="3">{t("memberAnnouncement")}</SelectItem>
                <SelectItem value="4">
                  {t("platformRoomAnnouncement")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("announcementTime")}
            </Label>
            <TimeRange onDateRangeChange={handleDateRangeChange} />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("language")}
            </Label>
            <Select
              defaultValue="1"
              value={language}
              onValueChange={(value) => setLanguage(value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">中文</SelectItem>
                <SelectItem value="2">英文</SelectItem>
                <SelectItem value="3">日文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("announcementContent")}
            </Label>
            <Textarea
              placeholder={t("placeholder")}
              className="w-2/3 h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("status")}
            </Label>
            <RadioGroup
              defaultValue="0"
              className="flex gap-2"
              value={status.toString()}
              onValueChange={(value) => setStatus(Number(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">{t("enable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">{t("disable")}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleClickAdd}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
