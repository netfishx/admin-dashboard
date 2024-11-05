import { Add } from "@/app/(dashboard)/games/supplier/add";
import { EditButton } from "@/app/(dashboard)/games/supplier/edit";
import { SupplierForm } from "@/app/(dashboard)/games/supplier/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

const data = [
  {
    game: "百家乐01",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐02",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐03",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐04",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐05",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
];

async function SupplierTableHeader() {
  "use cache";
  const t = await getTranslations("games.supplier");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("name")}</TableHead>
        <TableHead>{t("video")}</TableHead>
        <TableHead>{t("replay")}</TableHead>
        <TableHead>{t("supplierId")}</TableHead>
        <TableHead>{t("supplierName")}</TableHead>
        <TableHead>{t("quota")}</TableHead>
        <TableHead>{t("percent")}</TableHead>
        <TableHead className="w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <SupplierForm />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <div className="flex justify-end">
          <Add />
        </div>
        <div className="border rounded-sm">
          <Table>
            <SupplierTableHeader />
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.game}>
                  <TableCell>{item.game}</TableCell>
                  <TableCell>{item.video}</TableCell>
                  <TableCell>{item.replay}</TableCell>
                  <TableCell>{item.supplierId}</TableCell>
                  <TableCell>{item.supplierName}</TableCell>
                  <TableCell>{item.quota}</TableCell>
                  <TableCell>{item.percent}</TableCell>
                  <TableCell className="w-24 text-center">
                    <EditButton data={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
