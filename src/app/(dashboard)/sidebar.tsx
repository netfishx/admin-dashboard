"use client";

import { Menu } from "@/app/(dashboard)/menu";
import { ToggleSidebar } from "@/app/(dashboard)/toggle-sidebar";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

export function SideBar({
  status,
  permissions,
  hasReceiveOrderPermission,
}: {
  status: boolean;
  permissions: string[];
  hasReceiveOrderPermission: boolean;
}) {
  const t = useTranslations();
  const isOpened = useAtomValue(sidebarAtom);
  return (
    <div
      className={cn([
        "flex flex-col shrink-0 transition-all border-r",
        isOpened ? "w-56 min-[2400px]:w-96" : "w-12",
      ])}
    >
      <div className="flex-1 flex flex-col gap-2">
        <div
          className={cn([
            "w-full h-16 py-4 gap-4 flex items-center",
            isOpened ? "px-4" : "px-3",
          ])}
        >
          <svg
            width="192"
            height="192"
            fill="none"
            className={cn([isOpened ? "size-8" : "size-6"])}
            viewBox="0 0 33 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>logo</title>
            <g clipPath="url(#a)">
              <path
                d="M14.08 17.762c-.102-3.611-3.046-6.507-6.663-6.507-3.682 0-6.667 3.001-6.667 6.702 0 3.702 2.985 6.703 6.667 6.703a6.61 6.61 0 0 0 3.517-1.008 6.696 6.696 0 0 1-1.808-3.637 2.647 2.647 0 0 1-1.71.623 2.674 2.674 0 0 1-2.666-2.68c0-1.481 1.194-2.681 2.667-2.681a2.674 2.674 0 0 1 2.666 2.671c.315.071.698.116 1.164.116.804 0 1.787-.133 2.834-.302Z"
                fill="#0057FE"
              />
              <path
                d="M23.393 18.102c-.103-3.61-3.047-6.506-6.664-6.506-3.682 0-6.667 3-6.667 6.702 0 3.701 2.985 6.702 6.667 6.702a6.61 6.61 0 0 0 3.517-1.008 6.697 6.697 0 0 1-1.808-3.636 2.648 2.648 0 0 1-1.71.623 2.674 2.674 0 0 1-2.666-2.681c0-1.48 1.194-2.681 2.667-2.681a2.674 2.674 0 0 1 2.666 2.672c.315.07.698.115 1.164.115.804 0 1.787-.133 2.834-.302Z"
                fill="#307AF2"
              />
              <path
                d="M25.639 7h4.148l-3.003 4.627c3.353.352 5.966 3.202 5.966 6.666 0 3.701-2.985 6.702-6.667 6.702-3.681 0-6.666-3.001-6.666-6.702 0-.082.001-.164.004-.245.185-.014.367-.022.546-.022.895 0 1.616.014 2.198.025.526.01.938.018 1.261.012a2.674 2.674 0 0 0 2.657 2.91c1.473 0 2.667-1.2 2.667-2.68 0-1.481-1.194-2.681-2.667-2.681-.621 0-1.194.214-1.647.572-.285-1.35-.533-1.778-1.168-2.63-.322-.434-.93-.852-.93-.852L25.637 7Z"
                fill="#12D2AC"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path
                  fill="#fff"
                  transform="translate(.75)"
                  d="M0 0h32v32H0z"
                />
              </clipPath>
            </defs>
          </svg>
          <h1 className={cn(["text-xl font-medium", isOpened ? "" : "hidden"])}>
            {t("title")}
          </h1>
        </div>
        <Menu permissions={permissions} />
      </div>
      <ToggleSidebar
        status={status}
        hasReceiveOrderPermission={hasReceiveOrderPermission}
      />
    </div>
  );
}
