import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Actions from "./actions";

export interface AgentData {
  _id: string;
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: string;
}
const tempData = "111111111111111111111"
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
export default function List() {
  const t = useTranslations("report.periodlist");
  const CustomTableHeader = (text: string) => {
    return (
      <TableHead className="w-24 min-w-24 text-center">{text}</TableHead>
    )
  }
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* <Form /> */}
        <div className="p-2 bg-background flex-1">
          <div className="h-full rounded-sm relative">
            <ScrollArea className="h-full w-[calc(100dvw-16.1rem)]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                      {CustomTableHeader(t("gameId"))}
                      {CustomTableHeader(t("openTime"))}
                      {CustomTableHeader(t("gametype"))}
                      {CustomTableHeader(t("gamename"))}
                      {CustomTableHeader(t("betNum"))}
                      {CustomTableHeader(t("betMoneyAmount"))}
                      {CustomTableHeader(t("heMoney"))}
                      {CustomTableHeader(t("ddMoney"))}
                      {CustomTableHeader(t("workMoney"))}
                      {CustomTableHeader(t("memberBackMoney"))}
                      <TableHead className="w-24 text-center sticky right-0">
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
                      <TableCell className="w-24 text-center">
                        <Actions />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
