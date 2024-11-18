"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

export default function CopyButton({ address }: { address: string }) {
  const [, copyToClipboard] = useCopyToClipboard();
  return (
    <Button
      variant="ghost"
      className="size-4"
      onClick={() => {
        copyToClipboard(address);
        toast.success("复制成功");
      }}
    >
      <Copy className="size-4" />
    </Button>
  );
}
