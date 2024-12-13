import { useTranslations } from "next-intl";

// 提现状态
export function getStatusDicts() {
  const t = useTranslations("withdraw.apply");
  return [
    {
      value: 0,
      label: t("unprocessed"),
    },
    {
      value: 1,
      label: t("locked"),
    },
    {
      value: 2,
      label: t("rejected"),
    },
    {
      value: 3,
      label: t("passed"),
    },
  ];
}
