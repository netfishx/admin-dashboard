"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function APIError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("e");
  const router = useRouter();
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 1000,
        onAutoClose: () => {
          router.replace("/login");
        },
        onDismiss: () => {
          router.replace("/login");
        },
      });
    }
  }, [error, router.replace]);

  return null;
}
