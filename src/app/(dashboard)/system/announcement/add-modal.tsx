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
import { Input } from "@/components/ui/input";
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { TimeRange } from "./time-range";

export function AddModal() {
  const searchParams = useSearchParams();
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("system.announcement");
  const [type, setType] = useState("1");
  const [language, setLanguage] = useState("zh-CN");
  const [labelOfLanguage, setTitleOfLanguage] = useState("");
  const [contentOfLanguage, setContentOfLanguage] = useState("");
  const [status, setStatus] = useState("1");
  const [open, setOpen] = useAtom(contentEditModalAtom);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const editModalTitle = useAtomValue(editModalTitleAtom);
  const data = useAtomValue(contentModalDataAtom);
  const [contentData, setContentData] = useState<
    {
      id?: string;
      language: string;
      label?: string;
      content: string;
    }[]
  >([]); // 用于存储每个语言的内容
  const handleClickAdd = async () => {
    const addParams = {
      id: data?.id || null,
      type: Number(type),
      content: contentData,
      contentId: data?.contentId || null,
      status: Number(status),
      startTime: startTime ? new Date(startTime).getTime() : null,
      endTime: endTime ? new Date(endTime).getTime() : null,
    };
    startTransition(async () => {
      const { code, message } = await saveAnnouncement(addParams);
      if (code === 0) {
        setOpen(false);
        toast.success(message);
        resetFields();
        router.refresh();
      } else {
        toast.error(message);
      }
    });
  };

  // 回调函数，用于接收子组件传递的时间数据
  const handleDateRangeChange = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
  };

  const resetFields = () => {
    setType("1");
    setLanguage(data?.contentList?.[0]?.language || "zh-CN");
    setContentData([]);
    setContentOfLanguage("");
    setTitleOfLanguage("");
    setStatus("1");
    setStartTime("");
    setEndTime("");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data?.id) {
      setContentData(data.contentList || []);
      setContentOfLanguage(data.contentOfLanguage || "");
      setTitleOfLanguage(data.labelOfLanguage || "");
      setType(data.type.toString() || "1");
      setLanguage(data.contentList?.[0]?.language || "zh-CN");
      setStatus(data.status.toString() || "1");
      setStartTime(data.startTime.toString() || "");
      setEndTime(data.endTime.toString() || "");
    } else {
      resetFields();
    }
  }, [data]);

  // 语言选择变化时更新内容
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // 根据选择的语言，更新内容框的内容
    const currentContent = contentData.find((item) => item.language === value);
    if (currentContent) {
      setContentOfLanguage(currentContent.content);
      setTitleOfLanguage(currentContent.label || "");
    } else {
      setContentOfLanguage(""); // 如果没有找到对应语言，清空内容框
      setTitleOfLanguage("");
    }
  };

  // 处理标题输入
  const handleTitleChange = (value: string) => {
    setTitleOfLanguage(value);
    // 更新当前语言对应的内容
    setContentData((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.language === language,
      );
      if (existingIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = {
          id: updatedData[existingIndex].id,
          language,
          label: value,
          content: contentOfLanguage,
        };
        return updatedData;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // 如果该语言的内容不存在，则添加新数据
        return [
          ...prevData,
          { language, labelOfLanguage, content: contentOfLanguage },
        ];
      }
    });
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
          label: labelOfLanguage,
          content: value,
        };
        return updatedData;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // 如果该语言的内容不存在，则添加新数据
        return [...prevData, { language, labelOfLanguage, content: value }];
      }
    });
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (isPending) {
      params.set("loading", "true");
    } else {
      params.set("loading", "false");
    }
    router.push(`?${params.toString()}`);
  }, [isPending]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <span className="text-destructive">*</span>
              {t("announcementType")}
            </Label>
            {/* todo：公告类型 根据管理员和代理角色 展示的也不一样 */}
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
                <SelectItem value="1">{t("platformAnnouncement")}</SelectItem>
                <SelectItem value="2">{t("agentAnnouncement")}</SelectItem>
                <SelectItem value="3">{t("roomAnnouncement")}</SelectItem>
                <SelectItem value="4">
                  {t("platformRoomAnnouncement")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              <span className="text-destructive">*</span>
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
              <span className="text-destructive">*</span>
              {t("language")}
            </Label>
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={handleLanguageChange}
            >
              <ToggleGroupItem value="zh-CN">{t("chinese")}</ToggleGroupItem>
              <ToggleGroupItem value="en-US">{t("english")}</ToggleGroupItem>
            </ToggleGroup>
          </div>
          {/* 标题 : 平台代理公告 下级代理公告时 不显示 */}
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              <span className="text-destructive">*</span>
              {t("title")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-2/3 resize-none"
              value={labelOfLanguage}
              maxLength={20}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-24 text-right text-muted-foreground">
              <span className="text-destructive">*</span>
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
              <span className="text-destructive">*</span>
              {t("status")}
            </Label>
            {/* 状态： 1 启用 0 停用 */}
            <RadioGroup
              defaultValue="0"
              className="flex gap-2"
              value={status.toString()}
              onValueChange={(value) => setStatus(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">{t("enable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">{t("disable")}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button onClick={handleClickAdd} disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
