"use client";
import { errorAtom, lastErrorTimeAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { toast } from "sonner";

export type Error = {
  error: boolean;
  time: number;
  message?: string;
};

export function ErrorToast() {
  const [lastErrorTime, setLastErrorTime] = useAtom(lastErrorTimeAtom);
  const error = useAtomValue(errorAtom);
  useEffect(() => {
    if (error.error && error.time !== lastErrorTime) {
      toast.error(error.message ?? "Something went wrong");
      setLastErrorTime(error.time);
    }
  }, [error, lastErrorTime, setLastErrorTime]);

  return null;
}
