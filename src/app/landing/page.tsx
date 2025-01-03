import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Bg } from "./bg";

export const metadata: Metadata = {
  title: "006",
  description: "006",
};

function LinkButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Button asChild className="w-36 bg-blue-500/90 hover:bg-blue-500/80">
      <Link href={href} target="_blank">
        {children}
      </Link>
    </Button>
  );
}

export default async function LandingPage() {
  return (
    <div>
      <Bg />
      <div className="absolute bottom-[10dvh] z-10 flex w-full items-center justify-center gap-4">
        <LinkButton href="https://006test.s3.ap-east-1.amazonaws.com/006test/apk/SIX_0102.apk">
          安卓下载
        </LinkButton>
        <LinkButton href="https://google.com">iOS下载</LinkButton>
      </div>
    </div>
  );
}
