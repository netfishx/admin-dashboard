import "@/assets/globals.css";
import { ErrorToast } from "@/components/error-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Provider as JotaiProvider } from "jotai";
import { getTranslations } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode, Suspense } from "react";
import { I18nProvider } from "./i18n-provider";

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
                <Suspense fallback={null}>
                  <Title />
                </Suspense>
                {children}
              </I18nProvider>
              <ErrorToast />
            </JotaiProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
