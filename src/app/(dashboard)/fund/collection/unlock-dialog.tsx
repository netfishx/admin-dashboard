"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {} from "@/components/ui/scroll-area";
import {} from "@/components/ui/table";

interface Dialogprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnlockDialog(props: Dialogprops) {
  const { open, onOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>详情</DialogTitle>
        </DialogHeader>
        unlock
      </DialogContent>
    </Dialog>
  );
}
