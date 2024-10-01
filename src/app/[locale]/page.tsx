import { FormExample } from "@/app/[locale]/form";
import { RefreshButton } from "@/app/[locale]/refreshButton";
import { Sleep } from "@/app/[locale]/sleep";
import { Time } from "@/app/[locale]/time";
import demo from "@/assets/images/demo.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Password } from "@/components/ui/password";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "next-view-transitions";
import { headers } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  // headers().forEach((value, key) => {
  //   console.info("header", key, value);
  // });

  const array = (await headers())
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.split(":");
  const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Button asChild variant="outline">
          <Link href="/locale">国际化测试</Link>
        </Button>
      </div>
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
        <Button asChild variant="link">
          <Link href="/tree">Tree Select</Link>
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
      <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
        <Time />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
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
