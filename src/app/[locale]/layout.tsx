import "@/assets/globals.css";
import { ErrorToast } from "@/components/error-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Provider as JotaiProvider } from "jotai";
import { getTranslations } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode, Suspense } from "react";
import { I18nProvider } from "./i18n-provider";
import { QueryProviders } from "./query-provider";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Suspense fallback={null}>
            <NuqsAdapter>
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
                    <I18nProvider>{children}</I18nProvider>
                    <ErrorToast />
                  </JotaiProvider>
                </QueryProviders>
              </ThemeProvider>
            </NuqsAdapter>
          </Suspense>
        </body>
      </html>
    </ViewTransitions>
  );
}
