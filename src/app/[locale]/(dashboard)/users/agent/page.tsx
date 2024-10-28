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
import { AddAgentModal } from "./add-agent-modal";
import { UserInfoModal } from "./user-info-modal";
export interface AgentData {
  _id: string;
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
        <div className="p-2 bg-background flex-1 gap-2">
          <div className="pb-2">
            <Button onClick={() => setAddAgentModal(true)}>
              {t("addAgent")}
            </Button>
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
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="min-w-32">
                      {item.upUserName}
                    </TableCell>
                    <TableCell className="min-w-32">{item.userLevel}</TableCell>
                    <TableCell className="min-w-32">{item.userId}</TableCell>
                    <TableCell className="min-w-32">{item.userName}</TableCell>
                    <TableCell className="min-w-32">{item.nickName}</TableCell>
                    <TableCell className="min-w-32">{item.status}</TableCell>
                    <TableCell className="min-w-[400px] text-center flex gap-2 2xl:gap-6">
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
                        onClick={() => {
                          setUserInfoModal(true);
                          setActiveData(item);
                        }}
                      >
                        {t("userInfo")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
                      >
                        {t("transferMoney")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
                      >
                        {t("gamesSetting")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
                      >
                        {t("limitSetting")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
                      >
                        {t("rebateSetting")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
                      >
                        {t("loginLog")}
                      </Button>
                      <Button
                        variant="link"
                        className="hover:no-underline hover:text-primary/80 px-0"
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
      <AddAgentModal
        open={addAgentModal}
        onOpenChange={handleChangeAddAgentModal}
      />
    </>
  );
}
