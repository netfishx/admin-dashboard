"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <html lang="en">
      <body className="flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-medium">系统维护，请稍后再试！</h2>
        <Button
          type="button"
          className="text-base w-fit"
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
