import type { Metadata } from "next";

import "@/assets/globals.css";
import { QueryProviders } from "@/app/[locale]/query-provider";
import { ErrorToast } from "@/components/error-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Provider as I18nProvider } from "@/locales/provider";
import { Provider as JotaiProvider } from "jotai";
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
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster
              position="top-center"
              richColors
              expand
              visibleToasts={1}
              toastOptions={{ duration: 1000 }}
            />
            <QueryProviders>
              <JotaiProvider>
                <I18nProvider locale={locale}>{children}</I18nProvider>
                <ErrorToast />
              </JotaiProvider>
            </QueryProviders>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
