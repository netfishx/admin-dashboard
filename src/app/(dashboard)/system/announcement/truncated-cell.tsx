"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TruncatedCell({
  type,
  content,
  maxLength = 50,
  className,
}: {
  type: number;
  content: string;
  maxLength?: number;
  className?: string;
}) {
  const t = useTranslations("system.announcement");
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = content.length > maxLength;
  const router = useRouter();

  if (!shouldTruncate) {
    return (
      <td
        className={cn(
          "px-4 py-2 text-center",
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
            className="inline text-destructive hover:text-destructive/80 text-xs ml-1 underline"
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
            className="inline text-destructive hover:text-destructive/80 text-xs ml-1 underline"
          >
            {t("view")}
          </Button>
        )}
      </td>
    );
  }

  return (
    <td className="px-4 py-2 border-b">
      <div className="flex items-center gap-2">
        <span
          className={cn(
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
                className="inline text-primary hover:text-primary/80 text-xs ml-1 underline"
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
                  className="inline text-destructive hover:text-destructive/80 text-xs ml-1 underline"
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
                  className="inline text-destructive hover:text-destructive/80 text-xs ml-1 underline"
                >
                  {t("view")}
                </Button>
              )}
              <Button
                variant="link"
                onClick={() => setIsExpanded(false)}
                className="inline text-primary hover:text-primary/80 text-xs ml-1 underline"
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
