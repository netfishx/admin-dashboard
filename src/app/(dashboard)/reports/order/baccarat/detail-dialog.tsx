"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Dialogprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Detaildialog(props: Dialogprops) {
  const { open, onOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>详情</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">占成明细</div>
        <ScrollArea className="w-[450px]">
          <div className="whitespace-nowrap mb-1">
            DL123123 30% - DL213445 10% - DL29123 10% - HY29123(房主) 5%DL123123
            30% - DL213445 10% - DL29123 10% - HY29123(房主) 5%DL123123 30% -
            DL213445 10% - DL29123 10% - HY29123(房主) 5%
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* <div>靴数: 8</div>
        <div>牌局结果: 庄:♣3 ♣7; ♦2 ♠6</div> */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-20 text-center">靴数</TableHead>
              <TableHead className="w-20 text-center">局数</TableHead>
              <TableHead className="w-40 text-center">牌局结果</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-20 text-center">8</TableCell>
              <TableCell className="w-20 text-center">32</TableCell>
              <TableCell className="w-40 text-center">
                庄:♣3 ♣7; 闲:♦2 ♠6
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
