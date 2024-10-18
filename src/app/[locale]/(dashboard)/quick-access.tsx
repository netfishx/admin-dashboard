import React from 'react'
import {
  Card,
} from "@/components/ui/card"
import { getI18n } from "@/locales/server";
import { Users, Scale, Gamepad2, FileText } from 'lucide-react';

export default async function QuickAccess() {
  const t = await getI18n();
  return (
    <div className="w-[280px] p-5 rounded border bg-card mb-2 ">
      <div className="text-base mb-4">{t("quickAccess")}</div>
      <div className="grid grid-cols-3 gap-4">
        {/* 第一行 */}
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">{t("memberManagement")}</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">{t("agentManagement")}</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">{t("withdrawalApplication")}</p>
        </div>

        {/* 第二行 */}
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2 whitespace-nowrap">{t("helpSubordinateRepay")}</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">{t("betList")}</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">{t("agentReport")}</p>
        </div>

        {/* 第三行 */}
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">{t("memberReport")}</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">{t("betList")}</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer rounded-sm">
          <div className="w-[36px] h-[36px] bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">{t("accountChangeRecord")}</p>
        </div>
      </div>
    </div>
  )
}
