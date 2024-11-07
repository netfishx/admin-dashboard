"use client";
import { editSupplierConfigAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { gamesSupplierDialogAtom, supplierConfigAtom } from "@/store";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

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

const suppliers = [
  {
    name: "1111",
    id: "1",
  },
  {
    name: "2222",
    id: "2",
  },
  {
    name: "3333",
    id: "3",
  },
];

export function SupplierDialog() {
  const translations = useTranslations();
  const t = useTranslations("games.supplier");
  const [open, setOpen] = useAtom(gamesSupplierDialogAtom);
  const data = useAtomValue(supplierConfigAtom);
  const [supplierId, setSupplierId] = useState(data?.userId);
  const supplierName = suppliers.find((item) => item.id === supplierId)?.name;
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{`${data ? t("edit") : t("add")}${t("title")}`}</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>编辑供应商配置</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await editSupplierConfigAction(
              new FormData(e.currentTarget),
            );
            if (res.code === 0) {
              setOpen(false);
              router.refresh();
            } else {
              toast.error(res.message);
            }
          }}
          ref={ref}
        >
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <input type="hidden" name="gameType" value={1} />
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("name")}</Label>
              <Select
                required
                defaultValue={data?.gameId?.toString()}
                name="gameId"
                disabled={!!data?.gameId}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("placeholder")} />
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
                required
                name="videoLink"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("supplierId")}</Label>
              <Select
                value={supplierId}
                onValueChange={setSupplierId}
                name="userId"
                required
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("supplierName")}</Label>
              <Input disabled className="flex-1" defaultValue={supplierName} />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("quota")}</Label>
              <Input
                type="number"
                className="flex-1"
                min={0}
                step={0.01}
                required
                placeholder={t("quota")}
                defaultValue={data?.distributionAmount}
                name="distributionAmount"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end">{t("percent")}</Label>
              <div className="relative flex-1">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  required
                  placeholder={t("percent")}
                  className="pr-8"
                  defaultValue={data?.distributionPercent}
                  name="distributionPercent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{translations("cancel")}</Button>
          </DialogClose>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
          >
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
