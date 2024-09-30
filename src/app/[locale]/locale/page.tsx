import { ClientI18n } from "@/app/[locale]/locale/client-i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getI18n, getScopedI18n } from "@/locales/server";
import { Link } from "next-view-transitions";
import { use } from "react";

export default function LocalePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      国际化测试
      <div>
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
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
  const t2 = use(getScopedI18n("hello"));
  return (
    <Card>
      <CardHeader>
        <CardTitle>server i18n</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t("hello")}</p>
        <p>{t("welcome", { name: "006" })}</p>
        <p>{t2("world")}</p>
      </CardContent>
    </Card>
  );
}
