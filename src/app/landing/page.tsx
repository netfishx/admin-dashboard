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
    <Button asChild className="w-36 bg-[#3590ec] hover:bg-[#3590ec]/80">
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
        <LinkButton href="https://ui.shadcn.com/docs/components/button">
          安卓下载
        </LinkButton>
        <LinkButton href="https://ui.shadcn.com/docs/components/button">
          iOS下载
        </LinkButton>
      </div>
    </div>
  );
}
