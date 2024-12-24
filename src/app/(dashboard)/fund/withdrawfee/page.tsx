import { getNewestWithdrawFee } from "@/api";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { List } from "./list";
import { TableBodySkeleton, TableHeaderWrapper } from "./list";

export default async function Page() {
  const t = await getTranslations("fund.withdrawfee");
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <Suspense
          fallback={
            <div className="flex flex-1 flex-col">
              <div className="flex flex-col gap-2 bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  {t("title")}
                  <div className="flex items-center gap-2">
                    <Button>{t("save")}</Button>
                  </div>
                </div>
              </div>
              <div className="flex h-full flex-col gap-2 bg-background p-4 mt-2">
                <div className="rounded-sm">
                  <Table className="rounded-sm border table-fixed bg-background h-full">
                    <TableHeaderWrapper />
                    <TableBodySkeleton />
                  </Table>
                </div>
              </div>
            </div>
          }
        >
          <TableWrapper />
        </Suspense>
      </div>
    </div>
  );
}
async function TableWrapper() {
  const { data } = await getNewestWithdrawFee();
  if (!data) {
    return null;
  }

  return <List data={data} />;
}
