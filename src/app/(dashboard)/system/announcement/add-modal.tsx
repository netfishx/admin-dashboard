"use client";
import { saveAnnouncement } from "@/api";
import { DateRangeFilter } from "@/components/daterange-filter";
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
import { Label } from "@/components/ui/label";
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
import type { SessionData } from "@/session";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  use,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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

  const [open, setOpen] = useAtom(contentEditModalAtom);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const editModalTitle = useAtomValue(editModalTitleAtom);
  const data = useAtomValue(contentModalDataAtom);
  const [type, setType] = useState(0);
  useEffect(() => {
    setType(data?.type ?? 0);
  }, [data]);

  // 验证参数 已确认： 有其中一个语言的完整内容即可 新增的时候id可以为空，编辑的时候id和content（会员公告的话还需要有label）必须同时存在，
  function validateParams(formData: FormData) {
    // 基础必填验证
    if (
      !((data || (type && startTime && endTime)) && formData.get("content"))
    ) {
      return { valid: false, message: t("allRequired") };
    }
    // 时间校验 （新增时）
    if (
      (!data && (startTime > endTime || startTime < Date.now())) ||
      (data && startTime > endTime && startTime > Date.now())
    ) {
      return { valid: false, message: t("timeError") };
    }
    // 如果是会员公告类型
    if ([2, 4].includes(type)) {
      const label = formData.get("label");
      if (!label) {
        return { valid: false, message: t("allRequired") };
      }
    }

    return { valid: true };
  }
  // 回调函数，用于接收子组件传递的时间数据
  const handleDateRangeChange = (startTime: number, endTime: number) => {
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const { valid, message } = validateParams(formData);
      if (valid) {
        const params = {
          id: data?.id,
          type,
          startTime,
          endTime,
          content: [
            {
              id: (formData.get("contentId") || undefined) as
                | string
                | undefined,
              language: "zh-CN",
              content: formData.get("content") as string,
              label: formData.get("label") as string,
            },
          ],
          status: Number(formData.get("status")),
        };
        console.info(params);
        const { code, message } = await saveAnnouncement(params);
        if (code === 0) {
          toast.success(message);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-h-[90dvh] max-w-3xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{editModalTitle}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form action="" ref={ref} onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-4 overflow-y-auto p-4">
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground before:text-destructive w-24 shrink-0 text-right before:mr-1 before:content-['*']">
                {t("announcementType")}
              </Label>
              {/* 公告类型 根据管理员和代理角色 展示的也不一样 */}
              {/* 
              类型：平台代理公告（对象：所有代理），平台会员公告（对象：所有会员），直属代理公告（对象：直属下级），直属会员公告（对象：直属会员）
              代理只展示直属代理公告和直属会员公告，admin展示前三项
            */}
              <input type="hidden" name="id" value={data?.id} />
              <Select
                defaultValue={data?.type.toString()}
                name="type"
                disabled={!!data?.id && Date.now() > data?.startTime}
                onValueChange={(value) => setType(Number(value))}
              >
                <SelectTrigger className="w-100">
                  <SelectValue placeholder={t("placeholderselect")} />
                </SelectTrigger>
                <SelectContent>
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
              <Label className="text-muted-foreground before:text-destructive w-24 shrink-0 text-right before:mr-1 before:content-['*']">
                {t("announcementTime")}
              </Label>

              <DateRangeFilter
                quickSetBtn={[]}
                isSearch={false}
                onDateRangeChange={handleDateRangeChange}
                formDateRange={{
                  from: Number(data?.startTime ?? 0),
                  to: Number(data?.endTime ?? 0),
                }}
                disabled={!!data?.id && Date.now() > data?.startTime}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground before:text-destructive w-24 shrink-0 text-right before:mr-1 before:content-['*']">
                {t("language")}
              </Label>
              <ToggleGroup type="single" defaultValue="zh-CN">
                <ToggleGroupItem value="zh-CN">{t("chinese")}</ToggleGroupItem>
                {/* <ToggleGroupItem value="en-US">{t("english")}</ToggleGroupItem> */}
              </ToggleGroup>
            </div>
            {[2, 4].includes(type) && (
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground before:text-destructive w-24 shrink-0 text-right before:mr-1 before:content-['*']">
                  {t("title")}
                </Label>
                <Input
                  placeholder={t("placeholder")}
                  className="w-100"
                  defaultValue={data?.labelOfLanguage}
                  maxLength={20}
                  name="label"
                />
              </div>
            )}
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground before:text-destructive w-24 shrink-0 text-right before:mr-1 before:content-['*']">
                {t("announcementContent")}
              </Label>
              <input type="hidden" name="contentId" value={data?.content.id} />
              <Textarea
                placeholder={t("placeholder")}
                className="h-32 resize-none"
                defaultValue={data?.contentOfLanguage}
                maxLength={200}
                name="content"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground before:text-destructive w-24 shrink-0 text-right before:mr-1 before:content-['*']">
                {t("status")}
              </Label>
              <RadioGroup
                defaultValue={data?.status.toString() ?? "1"}
                name="status"
                className="flex gap-2"
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
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
