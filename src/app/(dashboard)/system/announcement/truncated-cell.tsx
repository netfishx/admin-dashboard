"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function TruncatedCell({
  content,
  maxLength = 50,
}: { content: string; maxLength?: number }) {
  const t = useTranslations("system.announcement");
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = content.length > maxLength;

  if (!shouldTruncate) {
    return <td className="px-4 py-2 border-b">{content}</td>;
  }

  return (
    <td className="px-4 py-2 border-b">
      <div className="flex items-center gap-2">
        <span className="inline whitespace-pre-wrap">
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
            <Button
              variant="link"
              onClick={() => setIsExpanded(false)}
              className="inline text-primary hover:text-primary/80 text-xs ml-1 underline"
            >
              {t("collapse")}
            </Button>
          )}
        </span>
      </div>
    </td>
  );
}
