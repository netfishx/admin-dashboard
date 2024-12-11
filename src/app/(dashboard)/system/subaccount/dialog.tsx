"use client";
import { updateSubaccount } from "@/api";
import { validateFormData } from "@/app/(dashboard)/system/subaccount/validate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Password } from "@/components/ui/password";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Role, Subaccount } from "@/lib/types";
import { subaccountAtom, subaccountDialogAtom } from "@/store";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function SubaccountDialog({ roles }: { roles: Role[] }) {
  const translations = useTranslations();
  const t = useTranslations("system.subaccount");
  const [open, setOpen] = useAtom(subaccountDialogAtom);
  const data = useAtomValue(subaccountAtom);
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);
  const [status, setStatus] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    if (open) {
      setCheckedRoles(data?.roleList ?? []);
      setStatus(data?.status ?? 0);
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
              if (checkedRoles.length === 0) {
                toast.error(t("selectRoles"));
                return;
              }
              const formData = new FormData(e.currentTarget);
              checkedRoles.forEach((id) => {
                formData.append("roleList", id.toString());
              });
              formData.append("status", status.toString());
              const result = await validateFormData(
                formData,
                data ? "edit" : "create",
              );
              if (result.success) {
                const res = await updateSubaccount(result.data as Subaccount);
                if (res.code === 0) {
                  setOpen(false);
                  router.refresh();
                } else {
                  toast.error(res.message);
                }
              } else {
                toast.error(result.errors?.[0]?.message);
              }
            });
          }}
          ref={ref}
        >
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0">{t("name")}</Label>
                <Input
                  className="flex-1"
                  placeholder={t("name")}
                  defaultValue={data?.username}
                  required
                  disabled={!!data}
                  name="username"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0" />
                <div className="flex-1 text-xs text-destructive">
                  {t("usernameWarning")}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0">
                  {t("password")}
                </Label>
                <Password
                  className="flex-1"
                  placeholder={t("password")}
                  name="newPassword"
                  type="password"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0" />
                <div className="flex-1 text-xs text-destructive">
                  {t("passwordWarning")}
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end shrink-0">
                {t("confirmPassword")}
              </Label>
              <Password
                className="flex-1"
                placeholder={t("confirmPassword")}
                name="confirmPassword"
                type="password"
              />
            </div>
            {data && (
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0">{t("status")}</Label>
                <div className="flex-1 flex gap-2">
                  <div>
                    <RadioGroup
                      className="flex gap-2"
                      value={status.toString() ?? "0"}
                      onValueChange={(value) => {
                        setStatus(Number(value));
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="0" id="enable" />
                        <Label htmlFor="enable" className="text-sm leading-4">
                          {t("enable")}
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="1" id="disable" />
                        <Label htmlFor="disable" className="text-sm leading-4">
                          {t("disable")}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Label className="w-20 text-end shrink-0">
                {t("chooseRole")}
              </Label>
              <div className="flex-1 flex gap-2 flex-wrap">
                {roles.map((role) => (
                  <div key={role.id} className="flex gap-1">
                    <Checkbox
                      key={role.id}
                      checked={checkedRoles.includes(role.id ?? "")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCheckedRoles([...checkedRoles, role.id ?? ""]);
                        } else {
                          setCheckedRoles(
                            checkedRoles.filter((id) => id !== role.id),
                          );
                        }
                      }}
                    />
                    <span className="text-sm leading-4">{role.roleName}</span>
                  </div>
                ))}
              </div>
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
