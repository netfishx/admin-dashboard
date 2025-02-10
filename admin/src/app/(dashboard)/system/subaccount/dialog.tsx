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
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

export function SubaccountDialog({ roles }: { roles: Role[] }) {
  const translations = useTranslations();
  const t = useTranslations("system.subaccount");
  const [open, setOpen] = useAtom(subaccountDialogAtom);
  const data = useAtomValue(subaccountAtom);
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const router = useTransitionRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
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
              if (formData.getAll("roleList").length === 0) {
                toast.error(t("selectRoles"));
                return;
              }
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
              <div className="flex items-center gap-2">
                <Label className="w-20 shrink-0 text-end">{t("name")}</Label>
                <Input
                  className="flex-1"
                  placeholder={t("name")}
                  defaultValue={data?.username}
                  required
                  disabled={!!data}
                  name="username"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-20 shrink-0 text-end" />
                <div className="flex-1 text-destructive text-xs">
                  {t("usernameWarning")}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Label className="w-20 shrink-0 text-end">
                  {t("password")}
                </Label>
                <Password
                  className="flex-1"
                  placeholder={t("password")}
                  name="newPassword"
                  type="password"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-20 shrink-0 text-end" />
                <div className="flex-1 text-destructive text-xs">
                  {t("passwordWarning")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-20 shrink-0 text-end">
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
              <div className="flex items-center gap-2">
                <Label className="w-20 shrink-0 text-end">{t("status")}</Label>
                <div className="flex flex-1 gap-2">
                  <div>
                    <RadioGroup
                      className="flex gap-4"
                      defaultValue={data?.status?.toString() ?? "0"}
                      name="status"
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
              <Label className="w-20 shrink-0 text-end">
                {t("chooseRole")}
              </Label>
              <div className="flex flex-1 flex-wrap gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex gap-2">
                    <Checkbox
                      key={role.id}
                      value={role.id}
                      defaultChecked={data?.roleList?.includes(role.id ?? "")}
                      name="roleList"
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
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
