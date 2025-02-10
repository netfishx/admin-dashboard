"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useState } from "react";

export function TruncatedCell({
  type,
  content,
  maxLength = 50,
  className,
}: {
  type?: number;
  content: string;
  maxLength?: number;
  className?: string;
}) {
  const t = useTranslations("system.announcement");
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = content.length > maxLength;
  const router = useTransitionRouter();

  if (!shouldTruncate) {
    return (
      <td
        className={cn(
          "px-4 text-sm",
          className,
          (type === 6 || type === 7) && "text-destructive",
        )}
      >
        {content}
        {type === 6 && (
          <Button
            variant="link"
            onClick={() => {
              router.replace("/games/ratio");
            }}
            className="inline text-destructive text-sm underline hover:text-destructive/80"
          >
            {t("view")}
          </Button>
        )}
        {type === 7 && (
          <Button
            variant="link"
            onClick={() => {
              router.replace("/games/rebate");
            }}
            className="inline text-destructive text-sm underline hover:text-destructive/80"
          >
            {t("view")}
          </Button>
        )}
      </td>
    );
  }

  return (
    <td className="border-b px-4 py-2">
      <div className="flex gap-2">
        <span
          className={cn(
            "text-sm",
            "inline whitespace-pre-wrap",
            (type === 6 || type === 7) && "text-destructive",
          )}
        >
          {isExpanded ? content : content.slice(0, maxLength)}
          {!isExpanded && (
            <>
              <span>...</span>
              <Button
                variant="link"
                onClick={() => setIsExpanded(true)}
                className="inline text-primary text-sm underline hover:text-primary/80"
              >
                {t("viewMore")}
              </Button>
            </>
          )}
          {isExpanded && (
            <>
              {type === 6 && (
                <Button
                  variant="link"
                  onClick={() => {
                    router.replace("/games/ratio");
                  }}
                  className="inline text-destructive text-sm underline hover:text-destructive/80"
                >
                  {t("view")}
                </Button>
              )}
              {type === 7 && (
                <Button
                  variant="link"
                  onClick={() => {
                    router.replace("/games/rebate");
                  }}
                  className="inline text-destructive text-sm underline hover:text-destructive/80"
                >
                  {t("view")}
                </Button>
              )}
              <Button
                variant="link"
                onClick={() => setIsExpanded(false)}
                className="inline text-primary text-sm underline hover:text-primary/80"
              >
                {t("collapse")}
              </Button>
            </>
          )}
        </span>
      </div>
    </td>
  );
}
