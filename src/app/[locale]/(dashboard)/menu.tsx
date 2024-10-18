"use client";

import {} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Gamepad2, HomeIcon, Users } from "lucide-react";
import { MenuItem } from "./menu-item";

export function Menu() {
  return (
    <div className="flex flex-col gap-1">
      <MenuItem
        label="首页"
        href="/"
        icon={<HomeIcon className="size-4" />}
        isActive
      />
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="游戏管理"
            icon={<Gamepad2 className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="拦货设置" href="/" />
          <MenuItem label="赔率限制" href="/" />
          <MenuItem label="下级默认占成" href="/" />
          <MenuItem label="退水设置" href="/" />
          <MenuItem label="供应商设置" href="/" />
          <MenuItem label="维护设置" href="/" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="用户管理"
            icon={<Users className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="会员管理" href="/" />
          <MenuItem label="代理管理" href="/" />
          <MenuItem label="供应商管理" href="/" />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
