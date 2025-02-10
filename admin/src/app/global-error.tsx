"use client";
import { Button } from "@/components/ui/button";
import { useTransitionRouter } from "next-view-transitions";
import { startTransition } from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useTransitionRouter();
  return (
    <html lang="en">
      <body className="flex flex-col gap-4 p-4">
        <h2 className="font-medium text-2xl">系统维护，请稍后再试！</h2>
        <Button
          type="button"
          className="w-fit text-base"
          onClick={() => {
            startTransition(() => {
              reset();
              router.refresh();
            });
          }}
        >
          重试
        </Button>
      </body>
    </html>
  );
}
