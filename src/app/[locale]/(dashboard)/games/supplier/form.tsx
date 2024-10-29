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
import {} from "@/components/ui/table";
import { gamesSupplierDialogAtom, gamesSupplierEditAtom } from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export function SupplierForm() {
  const t = useTranslations("games.supplier");
  const [id, setId] = useQueryState("id");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const setData = useSetAtom(gamesSupplierEditAtom);
  return (
    <>
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("type")}</Label>
            <Select defaultValue="1" disabled>
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("supplierId")}</Label>
            <Input
              placeholder={t("placeholder")}
              value={id ?? ""}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <Button>{t("search")}</Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => {
              setData(undefined);
              setOpen(true);
            }}
          >
            {t("add")}
          </Button>
        </div>
      </div>
      <SupplierDialog />
    </>
  );
}

function SupplierDialog() {
  const t = useTranslations("games.supplier");
  const [open, setOpen] = useAtom(gamesSupplierDialogAtom);
  const data = useAtomValue(gamesSupplierEditAtom);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div>
            <Label>{t("name")}</Label>
            <span>{data?.game}</span>
          </div>
          <div>
            <Label>{t("supplierId")}</Label>
            <Input
              placeholder={t("placeholder")}
              defaultValue={data?.supplierId}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
