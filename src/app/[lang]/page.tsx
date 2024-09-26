import { FormExample } from "@/app/[lang]/form";
import { RefreshButton } from "@/app/[lang]/refreshButton";
import { Sleep } from "@/app/[lang]/sleep";
import { Time } from "@/app/[lang]/time";
import demo from "@/assets/images/demo.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Input as Password } from "@/components/ui/password";
import { type Lang, getDictionary } from "@/get-dictionary";
import { Link } from "next-view-transitions";
import { headers } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: Lang }>;
}>) {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  // headers().forEach((value, key) => {
  //   console.info("header", key, value);
  // });
  const { lang } = await params;
  const array = (await headers())
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.split(":");
  const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;
  console.info("home");
  const dict = await getDictionary(lang);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>国际化测试：{dict.common["500"]}</div>
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
      <div>
        <Image
          src={demo}
          alt="demo"
          width={300}
          className="rounded-md object-cover"
        />
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
