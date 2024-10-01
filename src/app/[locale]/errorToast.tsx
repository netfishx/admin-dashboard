"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ErrorToast({ error }: { error: boolean }) {
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  return null;
}
