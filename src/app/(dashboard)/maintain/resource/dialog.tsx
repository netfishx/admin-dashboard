"use client";

import { addBackgroundImage, uploadImage } from "@/api";
import { Button } from "@/components/ui/button";
import {
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
import { backgroundImageDataAtom, backgroundImageDialogAtom } from "@/store";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import fileInput from "./file-input.module.css";

export function AddOrEditDialog() {
  const t = useTranslations("maintain.resource");
  const translation = useTranslations();
  const [open, setOpen] = useAtom(backgroundImageDialogAtom);
  const data = useAtomValue(backgroundImageDataAtom);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [port, setPort] = useState<string>("0");
  const [position, setPosition] = useState<string>("0");
  const [language, setLanguage] = useState<string>("zh-CN");
  const [status, setStatus] = useState<number>(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function addOrEdit(request: {
    id?: string;
    pictureUri: string;
    pictureName: string;
    port: string;
    position: string;
    language: string;
    status: number;
    sort: number;
  }) {
    const { code, message } = await addBackgroundImage(request);
    if (code === 0) {
      toast.success(message);
      setOpen(false);
      router.refresh();
    } else {
      toast.error(message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allData = new FormData(e.currentTarget);
    startTransition(async () => {
      const formData = new FormData();
      const file = fileRef.current?.files?.[0];
      formData.append("file", file as File);
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error(t("fileSizeTooLarge"));
        return;
      }
      if (file) {
        const {
          data: uploadData,
          code: uploadStatus,
          message: uploadMessage,
        } = await uploadImage(formData);
        if (uploadStatus === 0 && uploadData) {
          const request = {
            id: data?.id,
            pictureUri: uploadData,
            pictureName: allData.get("pictureName") as string,
            port,
            position,
            language,
            status,
            sort: Number(allData.get("sort") as string),
          };
          await addOrEdit(request);
        } else {
          toast.error(uploadMessage);
          return;
        }
      } else if (data?.pictureUri) {
        startTransition(async () => {
          const req = {
            id: allData.get("id") as string,
            pictureUri: data?.pictureUri ?? "",
            pictureName: allData.get("pictureName") as string,
            port,
            position,
            language,
            status,
            sort: Number(allData.get("sort") as string),
          };
          await addOrEdit(req);
        });
      } else {
        toast.error(t("pictureRequired"));
        return;
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{data ? t("edit") : t("add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={formRef} action="" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            {data ? (
              <div className="flex items-center gap-2">
                <Label className="w-20 text-right">{t("id")}</Label>
                <span>{data.id}</span>
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <Label className="w-20 text-right" htmlFor="file">
                {t("photo")}
              </Label>
              <input
                type="file"
                className={fileInput.file}
                multiple={false}
                id="file"
                name="file"
                ref={fileRef}
                required={!data?.pictureUri}
                onBlur={(e) => {
                  e.target.reportValidity();
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("pictureName")}</Label>
              <Input
                name="pictureName"
                defaultValue={data?.pictureName}
                className="w-[320px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("port")}</Label>
              <Select
                value={port}
                onValueChange={(value) => {
                  setPort(value);
                }}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{t("game")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("position")}</Label>
              <Select
                value={position}
                onValueChange={(value) => {
                  setPosition(value);
                }}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{t("home")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("language")}</Label>
              <Select
                value={language}
                onValueChange={(value) => {
                  setLanguage(value);
                }}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh-CN">{t("chinese")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("sort")}</Label>
              <Input
                className="w-[320px]"
                type="number"
                min={0}
                name="sort"
                defaultValue={data?.sort.toString()}
                required
                onBlur={(e) => {
                  e.target.reportValidity();
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("status")}</Label>
              <RadioGroup
                className="flex gap-2"
                defaultValue={data?.status?.toString() ?? "0"}
                onValueChange={(value) => {
                  setStatus(Number(value));
                }}
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
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{translation("cancel")}</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              if (formRef.current) {
                formRef.current?.requestSubmit();
              }
            }}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
