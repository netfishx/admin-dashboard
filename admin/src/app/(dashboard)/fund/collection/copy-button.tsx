"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

export default function CopyButton({ address }: { address: string }) {
  const [, copyToClipboard] = useCopyToClipboard();
  const t = useTranslations("fund.collection");
  return (
    <Button
      variant="ghost"
      className="text-muted-foreground size-4"
      onClick={() => {
        copyToClipboard(address);
        toast.success(t("copySuccess"));
      }}
    >
      <Copy className="size-4" />
    </Button>
  );
}
