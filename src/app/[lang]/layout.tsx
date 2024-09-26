import type { Metadata } from "next";

import "@/assets/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { type Lang, getDictionary } from "@/get-dictionary";
import { DictProvider } from "@/utils/dict-provider";
import { Provider } from "jotai";
import { ViewTransitions } from "next-view-transitions";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "管理后台",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: Lang }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <ViewTransitions>
      <html lang={lang}>
        <body>
          <Toaster
            position="top-center"
            richColors
            expand
            visibleToasts={1}
            toastOptions={{ duration: 1000 }}
          />
          <DictProvider dictionary={dictionary}>
            <Provider>{children}</Provider>
          </DictProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
