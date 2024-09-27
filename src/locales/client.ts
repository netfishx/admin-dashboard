import { createI18nClient } from "next-international/client";

export const { useI18n, useScopedI18n, useChangeLocale, I18nProviderClient } = createI18nClient({
  zh: () => import("./zh"),
  ja: () => import("./ja"),
});
