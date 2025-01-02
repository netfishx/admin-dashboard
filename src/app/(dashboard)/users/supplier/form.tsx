"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function SupplierForm() {
  const t = useTranslations("users.supplier");
  const [username, setUsername] = useQueryState("username");
  const [id, setId] = useQueryState("id");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();

  return (
    <div className="bg-background flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("supplierId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={id ?? ""}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("username")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            startReset(() => {
              router.replace("/users/supplier");
            });
          }}
        >
          {isReset && <Loader2 className="animate-spin" />}
          {t("reset")}
        </Button>
        <Button
          onClick={() => {
            startTransition(router.refresh);
          }}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
