"use client";
import { errorAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export type Error = {
  error: boolean;
  time: number;
  message?: string;
};

export function SetError({ error }: { error: Error }) {
  const setError = useSetAtom(errorAtom);
  useEffect(() => {
    setError(error);
  }, [error, setError]);

  return null;
}
