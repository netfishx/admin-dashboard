import type { Metadata } from "next";

import "@/assets/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "jotai";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "管理后台",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <Toaster
          position="top-center"
          richColors
          expand
          visibleToasts={1}
          toastOptions={{ duration: 1000 }}
        />
        <NextIntlClientProvider messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
