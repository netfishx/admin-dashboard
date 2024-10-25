"use client";

import { getAgents } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { UserInfoModal } from "./user-info-modal";
export interface AgentData {
  id: number;
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: string;
}

export default function Page() {
  const t = useTranslations("users.agents");
  const [data, setData] = useState<AgentData[]>([]);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [activeData, setActiveData] = useState<AgentData | null>(null);
  function handleChangeUserInfoModal(open: boolean, refresh: boolean) {
    setUserInfoModal(open);
    setActiveData(null);
    refresh && getAgentsData();
  }
  async function getAgentsData() {
    const res = await getAgents();
    setData(res as AgentData[]);
  }
  useEffect(() => {
    getAgentsData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center bg-background py-2 px-4">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("userName")}</Label>
              <Input placeholder={t("placeholder")} />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("userId")}</Label>
              <Input placeholder={t("placeholder")} />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("upUserName")}</Label>
              <Input placeholder={t("placeholder")} />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("status")}</Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t("all")}</SelectItem>
                  <SelectItem value="2">{t("enable")}</SelectItem>
                  <SelectItem value="3">{t("disable")}</SelectItem>
                  <SelectItem value="4">{t("freeze")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outline">{t("reset")}</Button>
            <Button onClick={getAgentsData}>{t("search")}</Button>
          </div>
        </div>
        <div className="flex justify-start p-2">
          <Button>{t("addAgent")}</Button>
        </div>
        <div className="p-2 bg-background flex-1">
          <div className="border rounded-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("upUserName")}</TableHead>
                  <TableHead>{t("userLevel")}</TableHead>
                  <TableHead>{t("userId")}</TableHead>
                  <TableHead>{t("userName")}</TableHead>
                  <TableHead>{t("nickName")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="w-24 text-center">
                    {t("action")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.upUserName}</TableCell>
                    <TableCell>{item.userLevel}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.nickName}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="w-2/5 text-center">
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                        onClick={() => {
                          setUserInfoModal(true);
                          setActiveData(item);
                        }}
                      >
                        {t("userInfo")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                      >
                        {t("transferMoney")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                      >
                        {t("gamesSetting")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                      >
                        {t("limitSetting")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                      >
                        {t("rebateSetting")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                      >
                        {t("loginLog")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80"
                      >
                        {t("changeLog")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <UserInfoModal
        open={userInfoModal}
        onOpenChange={handleChangeUserInfoModal}
        editData={activeData}
      />
    </>
  );
}
