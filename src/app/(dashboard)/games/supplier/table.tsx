import { getSupplierConfigs } from "@/api";
import { EditButton } from "@/app/(dashboard)/games/supplier/edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export async function SupplierTableHeader() {
  "use cache";
  const t = await getTranslations("games.supplier");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-32">{t("name")}</TableHead>
        <TableHead className="w-60">{t("video")}</TableHead>
        <TableHead className="w-60">{t("supplierId")}</TableHead>
        <TableHead className="w-32">{t("supplierName")}</TableHead>
        <TableHead className="w-24">{t("quota")}</TableHead>
        <TableHead className="w-24">{t("percent")}</TableHead>
        <TableHead className="w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export async function SupplierTable({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { userId } = await searchParams;
  const res = await getSupplierConfigs(userId);
  const t = await getTranslations();
  return (
    <Table className="table-fixed">
      <SupplierTableHeader />
      <TableBody>
        {res.data && res.data.length > 0 ? (
          res.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.gameName}</TableCell>
              <TableCell>{item.videoLink}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.distributionAmount}</TableCell>
              <TableCell>{item.distributionPercent}%</TableCell>
              <TableCell className="w-24 text-center">
                <EditButton data={item} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-40 text-center">
              {t("noData")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
