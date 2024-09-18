import { FormExample } from "@/app/[locale]/form";
import { Sleep } from "@/app/[locale]/sleep";
import { Time } from "@/app/[locale]/time";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Input as Password } from "@/components/ui/password";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function Home() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  console.info(headers().get('x-forwarded-for'))
  const array = headers().get('x-forwarded-for')?.split(',')[0]?.split(':')
  const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS
  return (
    <div className="flex flex-col gap-4">
      {ip}
      <Suspense fallback={<div>Loading...</div>}>
        <Time />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Sleep />
      </Suspense>
      <div className="flex p-4 gap-4">
        <Input />
        <Button>Hello</Button>
      </div>
      <div>
        <FormExample />
        <Password type="password" />
      </div>
    </div>
  );
}
