"use client";
import type { SessionData } from "@/session";
import { memberListBaccaratAgentIdAtom } from "@/store";
import { useAtom } from "jotai";

export default function agentId(props: { session: SessionData }) {
  const [memberListBaccaratAgentId] = useAtom(memberListBaccaratAgentIdAtom);
  const { session } = props;

  return (
    <div>
      {memberListBaccaratAgentId ? memberListBaccaratAgentId : session?.mainId}
    </div>
  );
}
