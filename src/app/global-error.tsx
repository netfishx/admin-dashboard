"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-2xl font-medium">系统维护，请稍后再试！</h2>
        <Button type="button" onClick={() => reset()}>
          重试
        </Button>
      </body>
    </html>
  );
}
