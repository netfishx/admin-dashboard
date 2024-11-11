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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export default function Form() {
  const t = useTranslations("users.members");
  const router = useRouter();
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
    defaultValue: "",
  });
  return (
    <div className="flex justify-between items-center bg-background py-2 px-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("username")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("upUsername")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={upUsername ?? ""}
            onChange={(e) => setUpUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("status")}</Label>
          <Select
            value={status ?? ""}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">{t("all")}</SelectItem>
              <SelectItem value="0">{t("enable")}</SelectItem>
              <SelectItem value="1">{t("disable")}</SelectItem>
              <SelectItem value="2">{t("freeze")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline">{t("reset")}</Button>
        <Button onClick={() => router.refresh()}>{t("search")}</Button>
      </div>
    </div>
  );
}
