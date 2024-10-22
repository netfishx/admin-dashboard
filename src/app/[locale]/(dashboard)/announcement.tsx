"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Announcement() {
  const t = useTranslations();
  const [showMore, setShowMore] = useState(false);
  const data = [
    {
      content: "公告1内容 测试测试测试测试测试测试测试测试",
      type: "1",
    },
    {
      content: "公告2内容 测试测试测试测试测试测试测试测试",
      type: "2",
    },
    {
      content: "公告3内容 测试测试测试测试测试测试测试测试",
      type: "3",
    },
    {
      content: "公告4内容 测试测试测试测试测试测试测试测试",
      type: "4",
    },
    {
      content: "公告5内容 测试测试测试测试测试测试测试测试",
      type: "5",
    },
  ];

  return (
    <>
      <div className="bg-background p-4 rounded flex-1">
        <div className="flex justify-between mb-4">
          <div>{t("announcement")}</div>
          <button
            type="button"
            className="text-primary text-sm"
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
                key={item.content}
                className="text-ellipsis text-muted-foreground whitespace-nowrap overflow-hidden"
              >
                <span
                  className={cn(
                    "mr-2 px-2 py-1 inline-block rounded-sm",
                    `${item.type === "1" ? "text-primary bg-primary/10" : "text-orange bg-orange/10"}`,
                  )}
                >
                  {item.type === "1" ? "平台" : "代理"}
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
                  key={item.content}
                  className="text-ellipsis whitespace-nowrap overflow-hidden"
                >
                  <span
                    className={cn(
                      `${item.type === "1" ? "text-primary bg-primary/10" : "text-orange bg-orange/10"}`,
                      "mr-2 p-1 inline-block rounded-md",
                    )}
                  >
                    {item.type === "1" ? "平台" : "代理"}
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
