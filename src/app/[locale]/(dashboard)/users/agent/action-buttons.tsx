"use client";

import type { AgentData } from "@/api";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddAgentModal } from "./add-agent-modal";
import { TransferMoneyModal } from "./transfer-money-modal";
import { UserInfoModal } from "./user-info-modal";

export default function Action({ data }: { data: AgentData }) {
  const t = useTranslations("users.agents");
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [addAgentModal, setAddAgentModal] = useState(false);
  const [transferMoneyModal, setTransferMoneyModal] = useState(false);
  return (
    <>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setUserInfoModal(true);
        }}
      >
        {t("userInfo")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setTransferMoneyModal(true);
        }}
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
      <AddAgentModal
        open={addAgentModal}
        onOpenChange={(open) => setAddAgentModal(open)}
      />
      <UserInfoModal
        open={userInfoModal}
        onOpenChange={setUserInfoModal}
        editData={data}
      />
      <TransferMoneyModal
        open={transferMoneyModal}
        onOpenChange={setTransferMoneyModal}
        editData={data}
      />
    </>
  );
}
