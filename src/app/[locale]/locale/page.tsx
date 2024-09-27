import { ClientI18n } from "@/app/[locale]/locale/client-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getI18n } from "@/locales/server";
import { Link } from "next-view-transitions";
import { use } from "react";

export default function LocalePage() {
  return (
    <div>
      国际化测试
      <div>
        <Link href="/">返回首页</Link>
      </div>
      <div>
        <ServerI18n />
      </div>
      <div>
        <ClientI18n />
      </div>
    </div>
  );
}

function ServerI18n() {
  const t = use(getI18n());
  return (
    <Card>
      <CardHeader>
        <CardTitle>server i18n</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t("hello")}</p>
      </CardContent>
    </Card>
  );
}
