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
import type { GameInfo, Supplier } from "@/lib/types";
import { gamesSupplierDialogAtom, supplierConfigAtom } from "@/store";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function SupplierDialog({
  games,
  suppliers,
}: {
  games: GameInfo[];
  suppliers: Supplier[];
}) {
  const translations = useTranslations();
  const t = useTranslations("games.supplier");
  const [open, setOpen] = useAtom(gamesSupplierDialogAtom);
  const data = useAtomValue(supplierConfigAtom);
  const [supplierId, setSupplierId] = useState(data?.userId);
  const supplierName = suppliers.find(
    (item) => item.id === supplierId,
  )?.username;
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setSupplierId(undefined);
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{`${data ? t("edit") : t("add")}${t("title")}`}</DialogTitle>
          <VisuallyHiddenRoot>
            <DialogDescription>编辑供应商配置</DialogDescription>
          </VisuallyHiddenRoot>
        </DialogHeader>
        <Form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(async () => {
              const res = await editSupplierConfigAction(
                new FormData(e.currentTarget),
              );
              if (res.code === 0) {
                setOpen(false);
                router.refresh();
              } else {
                toast.error(res.message);
              }
            });
          }}
          ref={ref}
        >
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label className="w-20 text-end">{t("name")}</Label>
              {data && (
                <input
                  type="hidden"
                  name="game"
                  value={`${data.gameType}-${data.gameId}`}
                />
              )}
              <Select
                required={true}
                name="game"
                disabled={!!data?.gameId}
                defaultValue={data && `${data.gameType}-${data.gameId}`}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {games.map((item) => (
                    <SelectItem
                      key={item.gameId}
                      value={`${item.gameType}-${item.gameId}`}
                    >
                      {item.gameName}
                    </SelectItem>
                  ))}
                  {data && (
                    <SelectItem
                      key={data.gameId}
                      value={`${data.gameType}-${data.gameId}`}
                    >
                      {data.gameName}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-end">{t("video")}</Label>
              <Input
                className="flex-1"
                placeholder={t("video")}
                defaultValue={data?.videoLink}
                required
                name="videoLink"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-end">{t("supplierId")}</Label>
              <Select
                defaultValue={data?.userId}
                onValueChange={setSupplierId}
                name="userId"
                required={true}
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
            <div className="flex items-center gap-2">
              <Label className="w-20 text-end">{t("supplierName")}</Label>
              <span className="flex-1 flex h-9 items-center rounded-md border px-3 text-sm shadow-xs opacity-50 bg-muted">
                {supplierName || data?.userName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 text-end">{t("quota")}</Label>
              <Input
                type="number"
                className="flex-1"
                min={0}
                step={1}
                required
                placeholder={t("quota")}
                defaultValue={data?.distributionAmount}
                name="distributionAmount"
              />
            </div>
            <div className="flex items-center gap-2">
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
            disabled={isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
