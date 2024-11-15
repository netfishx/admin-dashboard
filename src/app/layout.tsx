import "@/assets/globals.css";
import { I18nProvider } from "@/app/i18n-provider";
import { ErrorToast } from "@/components/error-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Provider as JotaiProvider } from "jotai";
import { getTranslations } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode, Suspense } from "react";

async function Title() {
  const t = await getTranslations();
  return <title>{t("title")}</title>;
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
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
              <JotaiProvider>
                <I18nProvider>
                  <Suspense>
                    <Title />
                    {children}
                  </Suspense>
                </I18nProvider>
                <ErrorToast />
              </JotaiProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </body>
      </html>
    </ViewTransitions>
  );
}
