import { type AgentData, getAgents } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import Action from "./action-buttons";
import Form from "./form";
export default async function Page() {
  const t = await getTranslations("users.agents");
  const res = await getAgents();

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Form />
        <div className="p-2 bg-background flex-1 gap-2">
          <div className="pb-2">
            <Button>{t("addAgent")}</Button>
          </div>
          <div className="border rounded-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="min-w-32">{t("upUserName")}</TableHead>
                  <TableHead className="min-w-32">{t("userLevel")}</TableHead>
                  <TableHead className="min-w-32">{t("userId")}</TableHead>
                  <TableHead className="min-w-32">{t("userName")}</TableHead>
                  <TableHead className="min-w-32">{t("nickName")}</TableHead>
                  <TableHead className="min-w-32">{t("status")}</TableHead>
                  <TableHead className="min-w-[400px] text-center">
                    {t("action")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {res.data.map((item: AgentData) => (
                  <TableRow key={item.userId}>
                    <TableCell className="min-w-32">
                      {item.upUserName}
                    </TableCell>
                    <TableCell className="min-w-32">{item.userLevel}</TableCell>
                    <TableCell className="min-w-32">{item.userId}</TableCell>
                    <TableCell className="min-w-32">{item.userName}</TableCell>
                    <TableCell className="min-w-32">{item.nickName}</TableCell>
                    <TableCell className="min-w-32">{item.status}</TableCell>
                    <TableCell className="min-w-[400px] text-center flex gap-2 2xl:gap-6">
                      <Action {...item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
