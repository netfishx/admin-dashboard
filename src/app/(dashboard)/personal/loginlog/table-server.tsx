import { getAgentLoginLog } from "@/api";
import { getSession } from "@/session";

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
  console.info(start, end, pageNum, pageSize, ip);
  getSession().then((user) => {
    if (user) {
      getAgentLoginLog({
        startTime: start,
        endTime: end,
        pageNum: Number.parseInt(pageNum),
        pageSize: Number.parseInt(pageSize),
        agentId: user.id,
      }).then((res) => {
        console.info(res);
      });
    }
  });
  return <></>;
}
