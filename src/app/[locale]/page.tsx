import { FormExample } from "@/app/[locale]/form";
import { RefreshButton } from "@/app/[locale]/refreshButton";
import { Sleep } from "@/app/[locale]/sleep";
import { Time } from "@/app/[locale]/time";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Input as Password } from "@/components/ui/password";
import { Link } from "next-view-transitions";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function Home() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  // headers().forEach((value, key) => {
  //   console.info("header", key, value);
  // });
  const array = headers().get("x-forwarded-for")?.split(",")[0]?.split(":");
  const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;
  console.info("home");
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <Button asChild variant="link">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/list">List</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/search">Search</Link>
        </Button>
      </div>
      <div className="flex justify-end">
        <RefreshButton />
      </div>
      {ip}
      <Suspense fallback={<div>Loading...</div>}>
        <Time />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Sleep />
      </Suspense>
      <div className="flex gap-4">
        <Input />
        <Button>Hello</Button>
      </div>
      <div className="flex flex-col gap-4">
        <FormExample />
        <Password type="password" />
      </div>
    </div>
  );
}
