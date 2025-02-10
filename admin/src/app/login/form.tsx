"use client";

import { loginAction } from "@/actions";
import bg from "@/assets/images/bg.png";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useTranslations } from "next-intl";
import Form from "next/form";
import Image from "next/image";
import { type FormEvent, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("login");
  return (
    <Button disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : null}
      {t("button")}
    </Button>
  );
}

export function LoginForm() {
  const t = useTranslations("login");
  const ref = useRef<HTMLFormElement>(null);
  async function login() {
    if (!ref.current) {
      return;
    }
    const res = await loginAction(new FormData(ref.current));
    if (res?.message) {
      toast.error(res.message);
      setCode(nanoid());
    }
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login();
  }
  const [code, setCode] = useState(nanoid());
  return (
    <Form action="" onSubmit={handleSubmit} ref={ref}>
      <div className="relative flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden bg-accent">
        <Image src={bg} alt="background image" className="object-cover" fill />
        <div className="flex w-[400px] items-center justify-center gap-4">
          <Image src={logo} alt="Icon" className="size-8" />
          <span className="font-medium text-xl">{t("title")}</span>
        </div>
        <div className="z-10 flex w-[400px] flex-col gap-6 rounded-lg border bg-background p-10">
          <div className="flex flex-col gap-2">
            <Label className="flex gap-1 font-medium text-sm after:text-destructive after:content-['*']">
              {t("username.label")}
            </Label>
            <Input placeholder={t("username.placeholder")} name="username" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex gap-1 font-medium text-sm after:text-destructive after:content-['*']">
              {t("password.label")}
            </Label>
            <Password
              type="password"
              placeholder={t("password.placeholder")}
              name="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex gap-1 font-medium text-sm after:text-destructive after:content-['*']">
              {t("code.label")}
            </Label>
            <div className="flex gap-2">
              <Input placeholder={t("code.placeholder")} name="captcha" />
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/security/captcha?code=${code}`}
                className="shrink-0 cursor-pointer hover:opacity-80"
                width={96}
                height={36}
                alt="captcha"
                priority
                onClick={() => {
                  setCode(nanoid());
                }}
              />
              <input type="hidden" name="code" value={code} />
            </div>
          </div>
          <SubmitButton />
        </div>
      </div>
    </Form>
  );
}
