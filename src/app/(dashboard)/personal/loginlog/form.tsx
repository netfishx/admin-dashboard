import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Form() {
  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">登录时间</Label>
          <Input />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">登录IP</Label>
          <Input />
        </div>
      </div>
      <div>
        <Button>查询</Button>
      </div>
    </>
  );
}
