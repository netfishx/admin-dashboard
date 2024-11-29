"use client";
import { editRoleAction } from "@/actions";
import { PermissionTree } from "@/app/(dashboard)/system/role/permission";
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
import type { Permission, Res } from "@/lib/types";
import { roleAtom, roleDialogAtom } from "@/store";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { use, useLayoutEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function RoleDialog({
  permissions,
}: { permissions: Promise<Res<Permission[]>> }) {
  const translations = useTranslations();
  const t = useTranslations("system.role");
  const [open, setOpen] = useAtom(roleDialogAtom);
  const data = useAtomValue(roleAtom);
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const permissionsRes = use(permissions);

  const [permsIds, setPermsIds] = useState<number[]>(data?.permsIds ?? []);
  useLayoutEffect(() => {
    if (open) {
      setPermsIds(data?.permsIds ?? []);
    }
  }, [data, open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {`${data ? t("edit") : t("add")}${t("title")}`}
          </DialogTitle>
          <VisuallyHiddenRoot>
            <DialogDescription />
          </VisuallyHiddenRoot>
        </DialogHeader>
        <Form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(async () => {
              const formData = new FormData(e.currentTarget);
              formData.set("permsIds", permsIds.join(","));
              const res = await editRoleAction(formData);
              if (res.code === 0) {
                setOpen(false);
                window.location.reload();
              } else {
                toast.error(res.message);
              }
            });
          }}
          ref={ref}
        >
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end shrink-0">{t("name")}</Label>
              <Input
                className="flex-1"
                placeholder={t("name")}
                defaultValue={data?.roleName}
                required
                name="roleName"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end shrink-0">
                {t("permissions")}
              </Label>
              <PermissionTree
                permissions={permissionsRes?.data ?? []}
                checked={permsIds}
                onChangeAction={setPermsIds}
              />
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
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
