import type { Metadata } from "next";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "PFGO",
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
        <Toaster />
        <NextIntlClientProvider messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}