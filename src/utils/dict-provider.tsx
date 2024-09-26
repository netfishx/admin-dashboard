"use client";

import type { getDictionary } from "@/get-dictionary";
import { type ReactNode, createContext, useContext } from "react";

const DictContext = createContext<
  Awaited<ReturnType<typeof getDictionary>> | undefined
>(undefined);

export function DictProvider({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <DictContext.Provider value={dictionary}>{children}</DictContext.Provider>
  );
}

export function useDict() {
  const context = useContext(DictContext);
  if (!context) {
    throw new Error("useDict must be used within a DictProvider");
  }
  return context;
}
