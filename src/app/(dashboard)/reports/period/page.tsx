import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
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
import { Actions } from "./actions";
import { Form } from "./form";
export interface AgentData {
  _id: string;
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: string;
}
const tempData = "111111111111111111111";
const data = [
  {
    gameId: "123",
    openTime: 123,
    gametype: 123,
    gamename: tempData,
    betNum: tempData,
    betMoneyAmount: tempData,
    heMoney: tempData,
    ddMoney: tempData,
    workMoney: tempData,
    memberBackMoney: tempData,
  },
];
export default async function Page() {
  const t = await getTranslations("report.periodlist");

  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <Form />
        {/* table */}
        <div className="flex flex-col gap-2 w-full">
          <div className="p-2 bg-background flex-1">
            <div className="h-full border rounded-sm relative">
              <ListScrollArea>
                <Table className="">
                  <TableHeader className="sticky">
                    <TableRow className="bg-muted">
                      <TableHead className="min-w-32">{t("gameId")}</TableHead>
                      <TableHead className="min-w-32">
                        {t("openTime")}
                      </TableHead>
                      <TableHead className="min-w-32">
                        {t("gametype")}
                      </TableHead>
                      <TableHead className="min-w-32">
                        {t("gamename")}
                      </TableHead>
                      <TableHead className="min-w-32">{t("betNum")}</TableHead>
                      <TableHead className="min-w-32">
                        {t("betMoneyAmount")}
                      </TableHead>
                      <TableHead className="min-w-32">{t("heMoney")}</TableHead>
                      <TableHead className="min-w-32">{t("ddMoney")}</TableHead>
                      <TableHead className="min-w-32">
                        {t("workMoney")}
                      </TableHead>
                      <TableHead className="min-w-32">
                        {t("memberBackMoney")}
                      </TableHead>
                      <TableHead className="w-24 text-center sticky right-0 bg-muted">
                        {t("action")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.gameId}>
                        <TableCell className="w-24 text-center">
                          {item.gameId}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.openTime}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.gametype}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.gamename}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.betNum}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.betMoneyAmount}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.heMoney}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.ddMoney}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.workMoney}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          {item.memberBackMoney}
                        </TableCell>
                        <TableCell className="!sticky !right-0 bg-background w-24 text-center">
                          <Actions />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ListScrollArea>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
