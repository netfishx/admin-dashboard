import "@/assets/globals.css";
import { QueryProviders } from "@/app/[locale]/query-provider";
import { ErrorToast } from "@/components/error-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Provider as JotaiProvider } from "jotai";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import type { ReactNode } from "react";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

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
                <NextIntlClientProvider messages={messages}>
                  {children}
                </NextIntlClientProvider>
                <ErrorToast />
              </JotaiProvider>
            </QueryProviders>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
