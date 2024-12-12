"use client";
import type { SessionData } from "@/session";
import { orderListBaccaratAgentIdAtom } from "@/store";
import { useAtom } from "jotai";

export default async function agentId(props: { session: SessionData }) {
  const [orderListBaccaratAgentId] = useAtom(orderListBaccaratAgentIdAtom);
  const { session } = props;

  return (
    <div>
      {orderListBaccaratAgentId ? orderListBaccaratAgentId : session?.id}
    </div>
  );
}
