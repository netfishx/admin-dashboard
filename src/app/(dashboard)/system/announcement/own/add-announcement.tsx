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
import { Label } from "@/components/ui/label";
import {} from "@/components/ui/radio-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export function AddAnnouncement() {
  const t = useTranslations("system.announcement");
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  return (
    <>
      <Button className="float-right mb-2" onClick={() => setOpen(true)}>
        {t("add")}
      </Button>
      <AddModal
        open={open}
        onOpenChange={setOpen}
        startTime={searchParams.get("startTime")}
        endTime={searchParams.get("endTime")}
      />
    </>
  );
}
function AddModal({
  open,
  onOpenChange,
  startTime,
  endTime,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startTime: string | null;
  endTime: string | null;
}) {
  const translations = useTranslations();
  const t = useTranslations("system.announcement");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(0);
  const handleClickAdd = async () => {
    const addParams = {
      type,
      language,
      content,
      status: "0",
      startTime: startTime || "",
      endTime: endTime || "",
      createTime: Date.now().toString(),
    };
    console.info("🌸 ~ addParams:", addParams);
    const res = await saveAnnouncement(addParams);
    console.info("🌸 ~ res:", res);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("addModal")}</DialogTitle>
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
            <DateRangeFilter quickSetBtn={[]} />
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translations("cancel")}
          </Button>
          <Button onClick={handleClickAdd}>{translations("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
