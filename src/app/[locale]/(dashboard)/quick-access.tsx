import React from 'react'
import {
  Card,
} from "@/components/ui/card"
import { getI18n } from "@/locales/server";
import { Users, Scale, Gamepad2, FileChartColumnIncreasing } from 'lucide-react';

export default async function QuickAccess() {
  const t = await getI18n();
  return (
    <div className="w-[280px] p-5 rounded border bg-white mb-2 ">
      {/* <div className='text-base'>{t("quickaccess")}</div> */}
      <div className="text-base mb-4">快捷入口</div>
      <div className="grid grid-cols-3 gap-4">
        {/* 第一行 */}
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">会员管理</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">代理管理</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">申请取款</p>
        </div>

        {/* 第二行 */}
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2 whitespace-nowrap">帮下级还款</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <Gamepad2 className="h-4 w-4" />
          </div>
          <p className="text-xs mt-2">注单列表</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <FileChartColumnIncreasing className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">代理报表</p>
        </div>

        {/* 第三行 */}
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <FileChartColumnIncreasing className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">会员报表</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <FileChartColumnIncreasing className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">注单列表</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 rounded-sm">
          <div className="w-[36px] h-[36px] bg-gray-100 flex items-center justify-center rounded">
            <FileChartColumnIncreasing className="h-4 w-4" /> 
          </div>
          <p className="text-xs mt-2">账变记录</p>
        </div>
      </div>
    </div>
  )
}
