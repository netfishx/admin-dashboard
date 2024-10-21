import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
