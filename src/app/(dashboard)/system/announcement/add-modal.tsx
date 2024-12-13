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
import { DateRangeFilter } from "@/components/daterange-filter";
import { Label } from "@/components/ui/label";
import type { Announcement } from "@/lib/types";
import type { SessionData } from "@/session";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
export function AddModal({
  session,
}: {
  session: Promise<SessionData | null>;
}) {
  const translations = useTranslations();

  const sessionData = use(session);
  const permissions = sessionData?.permissions;

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("system.announcement");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("zh-CN");
  const [labelOfLanguage, setTitleOfLanguage] = useState("");
  const [contentOfLanguage, setContentOfLanguage] = useState("");
  const [status, setStatus] = useState("1");
  const [open, setOpen] = useAtom(contentEditModalAtom);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
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
      startTime: startTime,
      endTime: endTime,
    };
    const { valid, message } = validateParams(addParams);

    if (valid) {
      startTransition(async () => {
        const { code, message } = await saveAnnouncement(addParams);
        if (code === 0) {
          setOpen(false);
          toast.success(message);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    } else {
      toast.error(message);
      return;
    }
  };

  // 验证参数 已确认： 有其中一个语言的完整内容即可 新增的时候id可以为空，编辑的时候id和content（会员公告的话还需要有label）必须同时存在，
  function validateParams(params: Announcement) {
    // debugger;
    // 基础必填验证
    if (
      !params.type ||
      !params.status ||
      !params.startTime ||
      !params.endTime ||
      !Array.isArray(params.content) ||
      !params.content.some((item) => item.content) // 至少一个语言有内容
    ) {
      return { valid: false, message: t("allRequired") };
    }
    // 时间校验 （新增时）
    if (
      !params.id &&
      (params.startTime > params.endTime || params.endTime < Date.now())
    ) {
      return { valid: false, message: t("timeError") };
    }

    // 编辑状态验证
    if (params.id) {
      const contentWithId = params.content.filter((item) => item.id);
      // 有id的内容项中至少有一个content不为空
      if (!contentWithId.some((item) => item.content)) {
        return { valid: false, message: t("allRequired") };
      }

      // 如果是会员公告类型
      if (params.type === 2 || params.type === 4) {
        // label和content必须同时存在或都不存在
        if (
          params.content.some(
            (item) =>
              (!item.label && item.content) || (item.label && !item.content),
          )
        ) {
          return { valid: false, message: t("allRequired") };
        }
      }
    }

    return { valid: true };
  }
  // 回调函数，用于接收子组件传递的时间数据
  const handleDateRangeChange = (startTime: number, endTime: number) => {
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const resetFields = () => {
    setType("");
    setLanguage("zh-CN");
    setContentData([]);
    setContentOfLanguage("");
    setTitleOfLanguage("");
    setStatus("1");
    setStartTime(0);
    setEndTime(0);
  };

  // 语言选择变化时更新内容
  const handleLanguageChange = (value: string) => {
    if (!value) return;
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

  useEffect(() => {
    if (!open) {
      resetFields();
    } else if (open && data?.id) {
      setContentData(data.contentList || []);
      setContentOfLanguage(data.contentOfLanguage || "");
      setTitleOfLanguage(data.labelOfLanguage || "");
      setType(data.type.toString() || "");
      setLanguage("zh-CN");
      setStatus(data.status.toString() || "1");
      setStartTime(data.startTime || 0);
      setEndTime(data.endTime || 0);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="h-[60dvh] max-h-[60dvh] max-w-5xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{editModalTitle}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex w-full flex-col gap-4 overflow-y-auto p-4">
          <div className="flex items-center gap-4">
            <Label className="w-24 shrink-0 text-right text-muted-foreground before:text-destructive before:content-['*']">
              {t("announcementType")}
            </Label>
            {/* 公告类型 根据管理员和代理角色 展示的也不一样 */}
            {/* 
              类型：平台代理公告（对象：所有代理），平台会员公告（对象：所有会员），直属代理公告（对象：直属下级），直属会员公告（对象：直属会员）
              代理只展示直属代理公告和直属会员公告，admin展示所有
            */}
            <Select
              defaultValue=""
              value={type}
              onValueChange={(value) => setType(value)}
              disabled={!!data?.id && Date.now() > data?.startTime}
            >
              <SelectTrigger className="w-[361px]">
                <SelectValue placeholder={t("placeholderselect")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                {permissions?.includes("admin_stat") && (
                  <>
                    <SelectItem value="1">
                      {t("platformAgentAnnouncement")}
                    </SelectItem>
                    <SelectItem value="2">
                      {t("platformMemberAnnouncement")}
                    </SelectItem>
                  </>
                )}
                <SelectItem value="3">{t("agentAnnouncement")}</SelectItem>
                {!permissions?.includes("admin_stat") && (
                  <SelectItem value="4">{t("memberAnnouncement")}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-24 shrink-0 text-right text-muted-foreground before:text-destructive before:content-['*']">
              {t("announcementTime")}
            </Label>
            {/* <TimeRange disabled={!!data?.id && Date.now() > data?.startTime} /> */}
            <DateRangeFilter
              quickSetBtn={[]}
              isSearch={false}
              onDateRangeChange={handleDateRangeChange}
              formDateRange={{
                from: Number(startTime),
                to: Number(endTime),
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-24 shrink-0 text-right text-muted-foreground before:text-destructive before:content-['*']">
              {t("language")}
            </Label>
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={handleLanguageChange}
              defaultValue="zh-CN"
            >
              <ToggleGroupItem value="zh-CN">{t("chinese")}</ToggleGroupItem>
              {/* <ToggleGroupItem value="en-US">{t("english")}</ToggleGroupItem> */}
            </ToggleGroup>
          </div>
          {(type === "2" || type === "4") && (
            <div className="flex items-center gap-4">
              <Label className="w-24 shrink-0 text-right text-muted-foreground before:text-destructive before:content-['*']">
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
          )}
          <div className="flex items-center gap-4">
            <Label className="w-24 shrink-0 text-right text-muted-foreground before:text-destructive before:content-['*']">
              {t("announcementContent")}
            </Label>
            <Textarea
              placeholder={t("placeholder")}
              className="h-32 w-2/3 resize-none"
              value={contentOfLanguage}
              maxLength={200}
              onChange={(e) => handleContentChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-24 shrink-0 text-right text-muted-foreground before:text-destructive before:content-['*']">
              {t("status")}
            </Label>
            <RadioGroup
              defaultValue="0"
              className="flex gap-2"
              value={status.toString()}
              onValueChange={(value) => setStatus(value)}
            >
              {/* 状态： 1 启用 0 停用 */}
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
        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button onClick={handleClickAdd} disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
