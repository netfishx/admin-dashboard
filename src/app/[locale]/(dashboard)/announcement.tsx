"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useI18n } from "@/locales/client";
import { useState } from "react";

export default function Announcement() {
  const t = useI18n();
  const [showMore, setShowMore] = useState(false);
  const data = [
    {
      title: "公告2",
      content: "公告2内容 测试测试测试测试测试测试测试测试",
      type: "1",
    },
    {
      title: "公告3",
      content: "公告3内容",
      type: "3",
    },
  ];

  return (
    <>
      <div className="w-[280px] bg-white p-2">
        <div className="flex justify-between mb-4">
          <div>{t("announcement")}</div>
          <button
            className="text-blue-500 text-sm"
            onClick={() => {
              setShowMore(true);
            }}
          >
            {t("more")}
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full text-sm">
          {data.map((item) => {
            return (
              <div
                key={item.title}
                className="text-ellipsis whitespace-nowrap overflow-hidden"
              >
                <span
                  className={cn(
                    `${item.type === "1" ? "text-red-500 bg-[#FFF3E8]" : "text-blue-500 bg-blue-100"}`,
                    "mr-2 p-1 w-12",
                  )}
                >
                  {item.title}
                </span>
                {item.content}
              </div>
            );
          })}
        </div>
      </div>
      <Dialog open={showMore} onOpenChange={setShowMore}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("announcement")}</DialogTitle>
          </DialogHeader>
          <div
            className="flex flex-col gap-2 w-full text-sm"
            aria-describedby={undefined}
          >
            {data.map((item) => {
              return (
                <div
                  key={item.title}
                  className="text-ellipsis whitespace-nowrap overflow-hidden"
                >
                  <span
                    className={cn(
                      `${item.type === "1" ? "text-red-500 bg-[#FFF3E8]" : "text-blue-500 bg-blue-100"}`,
                      "mr-2 p-1 w-12",
                    )}
                  >
                    {item.title}
                  </span>
                  {item.content}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
