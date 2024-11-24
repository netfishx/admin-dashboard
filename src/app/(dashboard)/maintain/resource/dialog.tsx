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
import { type FormEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import fileInput from "./file-input.module.css";

export function AddOrEditDialog() {
  const t = useTranslations("maintain.resource");
  const translation = useTranslations();
  const [open, setOpen] = useAtom(backgroundImageDialogAtom);
  const data = useAtomValue(backgroundImageDataAtom);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [pictureUri] = useState<string>("");
  const [pictureName, setPictureName] = useState<string>("");
  const [port, setPort] = useState<string>("0");
  const [position, setPosition] = useState<string>("0");
  const [language, setLanguage] = useState<string>("cn");
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setPictureName(data.pictureName);
      setPort(data.port.toString());
      setPosition(data.position.toString());
      setLanguage(data.language);
      setStatus(data.status);
    }
  }, [data]);

  const handleSubmit = () => {
    startTransition(async () => {
      const { code, message } = await addBackgroundImage({
        id: data?.id,
        pictureUri,
        pictureName,
        port: Number(port),
        position: Number(position),
        language,
        status: Number(status),
        sort: 0,
      });
      if (code === 0) {
        toast.success(message);
        setOpen(false);
        router.refresh();
      }
    });
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");
    if (file) {
      const res = await uploadImage({ file: file as File });
      console.info(res);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{data ? t("edit") : t("add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {data ? (
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("id")}</Label>
              <span>{data.id}</span>
            </div>
          ) : null}
          <Form action="" onSubmit={handleUpload}>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-right">{t("photo")}</Label>
              <input
                type="file"
                className={fileInput.file}
                name="file"
                multiple={false}
              />
              <button type="submit">上传</button>
            </div>
          </Form>
          <div className="flex items-center gap-2">
            <Label className="w-20 text-right">{t("pictureName")}</Label>
            <Input
              value={pictureName}
              onChange={(e) => setPictureName(e.target.value)}
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
                <SelectItem value="cn">{t("chinese")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-20 text-right">{t("sort")}</Label>
            <Input className="w-[320px]" />
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-20 text-right">{t("status")}</Label>
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
          <DialogClose asChild>
            <Button variant="outline">{translation("cancel")}</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleSubmit}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
