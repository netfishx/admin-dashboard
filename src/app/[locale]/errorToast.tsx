"use client";
import { lastErrorTimeAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { toast } from "sonner";

export function ErrorToast({ error, time }: { error: boolean; time: number }) {
  const [lastErrorTime, setLastErrorTime] = useAtom(lastErrorTimeAtom);
  useEffect(() => {
    if (error && time !== lastErrorTime) {
      toast.error("Something went wrong");
      setLastErrorTime(time);
    }
  }, [error, time, lastErrorTime, setLastErrorTime]);

  return null;
}
