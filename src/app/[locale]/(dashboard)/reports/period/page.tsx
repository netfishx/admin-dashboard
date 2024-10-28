"use client";

import { getAgents } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateFilter from "@/components/date-filter"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface AgentData {
  _id: string;
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: string;
}
interface DateRange {
  from: string;
  to: string;
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
export default function Page() {
  const t = useTranslations("report.periodlist");
//   const [data, setData] = useState<AgentData[]>([]);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [addAgentModal, setAddAgentModal] = useState(false);
  const [activeData, setActiveData] = useState<AgentData | null>(null);
  function handleChangeUserInfoModal(open: boolean, refresh: boolean) {
    setUserInfoModal(open);
    setActiveData(null);
    refresh && getAgentsData();
  }
  function handleChangeAddAgentModal(open: boolean, refresh: boolean) {
    setAddAgentModal(open);
    refresh && getAgentsData();
  }
  async function getAgentsData() {
    const res = await getAgents();
    // setData(res as AgentData[]);
  }
  const handleDateRangeChange = (date: DateRange) => {
    console.log(date, 'date');
  }
  const handleFilterChange = (filterType: string, amount: number | null) => {
    console.log(`Filter: ${filterType}, Amount: ${amount}`);
  };
  const CustomTableHeader = (text: string) => {
    return (
      <TableHead className="w-24 min-w-24 text-center">{text}</TableHead>
    )
  }
  useEffect(() => {
    getAgentsData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-background">
          <div className="flex justify-between items-center  py-2 px-4">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("gametype")}</Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">百家乐</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("gamename")}</Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">百家乐01</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("gameId")}</Label>
              <Input placeholder={t("placeholderinput")} />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("openTime")}</Label>
              <DateFilter />
            </div>
          </div>
          </div>
          <div className="flex gap-2 items-center float-right p-2">
            <Button variant="outline">{t("reset")}</Button>
            <Button onClick={getAgentsData}>{t("search")}</Button>
            <Button variant="outline" onClick={getAgentsData}>{t("download")}</Button>
          </div>  
        </div> 
        <div className="bg-background flex-1">
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
                        <Button
                          variant="link"
                          className="hover:no-underline hover:text-primary/80"
                        >
                          {t("more")}
                        </Button>
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
      </div>
    
    </>
  );
}
