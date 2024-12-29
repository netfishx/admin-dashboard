"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export default function Form({
  permissions,
}: {
  permissions: string[] | undefined;
}) {
  const t = useTranslations("users.members");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isReset, startResetTransition] = useTransition();
  const [username, setUsername] = useQueryState("username", {
    defaultValue: "",
  });
  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [upUsername, setUpUsername] = useQueryState("upUsername", {
    defaultValue: "",
  });
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "all",
  });
  return (
    <div className="bg-background flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("username")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        {permissions?.includes("member_search") && (
          <div className="flex items-center gap-2">
            <Label className="shrink-0">{t("upUsername")}</Label>
            <Input
              placeholder={t("placeholder")}
              value={upUsername ?? ""}
              onChange={(e) => setUpUsername(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("status")}</Label>
          <Select
            value={status ?? ""}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="0">{t("enable")}</SelectItem>
              <SelectItem value="1">{t("disable")}</SelectItem>
              <SelectItem value="2">{t("freeze")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() =>
            startResetTransition(() => router.replace("/users/member"))
          }
        >
          {isReset && <Loader2 className="animate-spin" />}
          {t("reset")}
        </Button>
        <Button
          onClick={() => startTransition(() => router.refresh())}
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
