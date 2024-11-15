"use client";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { saveAnnouncement } from "@/api";
import { Label } from "@/components/ui/label";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TimeRange } from "./time-range";
export function AddModal() {
  const translations = useTranslations();
  const router = useRouter();
  const t = useTranslations("system.announcement");
  const [type, setType] = useState("0");
  const [language, setLanguage] = useState("cn");
  const [contentOfLanguage, setContentOfLanguage] = useState("");
  const [status, setStatus] = useState("0");
  const [open, setOpen] = useAtom(contentEditModalAtom);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const editModalTitle = useAtomValue(editModalTitleAtom);
  const data = useAtomValue(contentModalDataAtom);
  const [contentData, setContentData] = useState<
    { id?: string; language: string; content: string }[]
  >([]); // 用于存储每个语言的内容
  const handleClickAdd = async () => {
    const addParams = {
      id: data?.id || null,
      type,
      content: contentData,
      status,
      startTime: startTime ? new Date(startTime).getTime() : null,
      endTime: endTime ? new Date(endTime).getTime() : null,
    };
    console.info("addParams", addParams);
    const res = await saveAnnouncement(addParams);
    console.info("body", res);

    if (res.code === 0) {
      setOpen(false);
      resetFields();
      router.refresh();
    }
  };

  // 回调函数，用于接收子组件传递的时间数据
  const handleDateRangeChange = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
  };

  const resetFields = () => {
    setType("0");
    setLanguage(data?.content?.[0]?.language || "cn");
    setContentData([]);
    setContentOfLanguage("");
    setStatus("0");
    setStartTime("");
    setEndTime("");
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data?.id) {
      console.info("contentData", data.content);
      setContentData(data.content || []);
      setContentOfLanguage(data.contentOfLanguage || "");
      setType(data.type.toString() || "0");
      setLanguage(data.content?.[0]?.language || "cn");
      setStatus(data.status.toString() || "0");
      setStartTime(data.startTime.toString() || "");
      setEndTime(data.endTime.toString() || "");
    }
  }, [data, editModalTitle]);

  // 语言选择变化时更新内容
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // 根据选择的语言，更新内容框的内容
    const currentContent = contentData.find((item) => item.language === value);
    if (currentContent) {
      setContentOfLanguage(currentContent.content);
    } else {
      setContentOfLanguage(""); // 如果没有找到对应语言，清空内容框
    }
  };

  // 处理内容输入
  const handleContentChange = (value: string) => {
    setContentOfLanguage(value);
    // 更新当前语言对应的内容
    setContentData((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.language === language,
      );
      if (existingIndex !== -1) {
        // 如果该语言的内容已存在，则更新
        const updatedData = [...prevData];
        updatedData[existingIndex] = {
          id: updatedData[existingIndex].id,
          language,
          content: value,
        };
        return updatedData;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // 如果该语言的内容不存在，则添加新数据
        return [...prevData, { language, content: value }];
      }
    });
  };
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      resetFields();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-5xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{editModalTitle}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              {t("announcementType")}
            </Label>
            <Select
              defaultValue="0"
              value={type}
              onValueChange={(value) => setType(value)}
              disabled={!!data?.id && Date.now() > data?.startTime}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={t("placeholderselect")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">{t("platformAnnouncement")}</SelectItem>
                <SelectItem value="1">{t("agentAnnouncement")}</SelectItem>
                <SelectItem value="2">{t("memberAnnouncement")}</SelectItem>
                <SelectItem value="3">
                  {t("platformRoomAnnouncement")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              {t("announcementTime")}
            </Label>
            <TimeRange
              onDateRangeChange={handleDateRangeChange}
              range={[startTime, endTime]}
              disabled={!!data?.id && Date.now() > data?.startTime}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              {t("language")}
            </Label>
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={handleLanguageChange}
            >
              <ToggleGroupItem value="cn">{t("chinese")}</ToggleGroupItem>
              <ToggleGroupItem value="en">{t("english")}</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              {t("announcementContent")}
            </Label>
            <Textarea
              placeholder={t("placeholder")}
              className="w-2/3 h-32 resize-none"
              value={contentOfLanguage}
              maxLength={200}
              onChange={(e) => handleContentChange(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              {t("status")}
            </Label>
            <RadioGroup
              defaultValue="0"
              className="flex gap-2"
              value={status.toString()}
              onValueChange={(value) => setStatus(value)}
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
            {translations("cancel")}
          </Button>
          <Button onClick={handleClickAdd}>{translations("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
