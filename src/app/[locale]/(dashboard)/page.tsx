import { getI18n } from "@/locales/server";
import Announcement from "./announcement";
export default async function DashboardPage() {
  const t = await getI18n();
  return (
    <div>
      <div>{t("hello")}</div>
      <Announcement />
    </div>
  );
}
