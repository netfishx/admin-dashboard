"use client";
import { signOut } from "@/api";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { startTransition, useEffect } from "react";
import { toast } from "sonner";

export function APIError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("e");
  const router = useTransitionRouter();
  useEffect(() => {
    if (error !== null) {
      startTransition(async () => {
        await signOut();
        toast.error(error, {
          duration: 1000,
          onAutoClose: () => {
            router.replace("/login");
          },
          onDismiss: () => {
            router.replace("/login");
          },
        });
      });
    }
  }, [error, router.replace]);

  return null;
}
