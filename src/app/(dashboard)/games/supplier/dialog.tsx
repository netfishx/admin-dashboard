"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gamesSupplierDialogAtom, gamesSupplierEditAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Form from "next/form";

const games = [
  {
    name: "百家乐01",
    id: "1",
    type: "Baccarat",
  },
  {
    name: "百家乐02",
    id: "2",
    type: "Baccarat",
  },
  {
    name: "百家乐03",
    id: "3",
    type: "Baccarat",
  },
  {
    name: "百家乐04",
    id: "4",
    type: "Baccarat",
  },
];

export function SupplierDialog() {
  const translations = useTranslations();
  const t = useTranslations("games.supplier");
  const [open, setOpen] = useAtom(gamesSupplierDialogAtom);
  const data = useAtomValue(gamesSupplierEditAtom);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form action="">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${data ? t("edit") : t("add")}${t("title")}`}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("name")}</Label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue
                    placeholder={t("placeholder")}
                    defaultValue={data?.gameId}
                  />
                </SelectTrigger>
                <SelectContent>
                  {games.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("video")}</Label>
              <Input
                className="flex-1"
                placeholder={t("video")}
                defaultValue={data?.videoLink}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("supplierId")}</Label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue
                    placeholder={t("placeholder")}
                    defaultValue={data?.userId}
                  />
                </SelectTrigger>
                <SelectContent>
                  {games.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("supplierName")}</Label>
              <Input
                disabled
                className="flex-1"
                defaultValue={data?.userName}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("quota")}</Label>
              <Input
                type="number"
                className="flex-1"
                min={0}
                placeholder={t("quota")}
                defaultValue={data?.distributionAmount}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("percent")}</Label>
              <div className="relative flex-1">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder={t("percent")}
                  className="pr-8"
                  defaultValue={data?.distributionPercent}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">{translations("cancel")}</Button>
            <Button type="submit">{translations("confirm")}</Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
