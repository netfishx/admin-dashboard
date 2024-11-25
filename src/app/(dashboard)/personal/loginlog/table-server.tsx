import { getAgentLoginLog } from "@/api";

export function TableServer({
  start,
  end,
  pageNum,
  pageSize,
  ip,
}: {
  start: Date;
  end: Date;
  pageNum: string;
  pageSize: string;
  ip: string;
}) {
  getAgentLoginLog({
    startTime: start,
    endTime: end,
    pageNum: Number.parseInt(pageNum),
    pageSize: Number.parseInt(pageSize),
    agentId: "12312321321",
    ip,
  }).then((res) => {
    console.info(res);
  });
  return <></>;
}
