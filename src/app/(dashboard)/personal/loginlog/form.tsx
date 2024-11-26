"use client";

import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryState } from "nuqs";

export function Form() {
  const [ip, setIp] = useQueryState("ip", { defaultValue: "" });
  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">登录时间</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">登录IP</Label>
          <Input value={ip} onChange={(e) => setIp(e.target.value)} />
        </div>
      </div>
      <div>
        <Button>查询</Button>
      </div>
    </>
  );
}
