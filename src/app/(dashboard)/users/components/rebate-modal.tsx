"use client";

import { updateAgentGameConfig } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { rebateDataAtom, rebateModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

/**
 * 返点设置模态框组件
 * @param userId - 用户ID
 */
export function RebateModal({ userId }: { userId: string }) {
  const translations = useTranslations();
  const t = useTranslations("users.agents");

  const [open, setOpen] = useAtom(rebateModalAtom);
  const [isPending, startTransition] = useTransition();
  const data = useAtomValue(rebateDataAtom);
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [changedItems, setChangedItems] = useState<{
    [key: number]: string;
  }>({});

  const handleChange = (gameId: number, value: string) => {
    setChangedItems({ ...changedItems, [gameId]: value });
  };

  const handleConfirm = () => {
    if (Object.keys(changedItems).length > 0) {
      updateAgentGameConfig({
        userId,
        list: Object.entries(changedItems).map(([gameId, backRate]) => ({
          gameId: Number(gameId),
          backRate,
        })),
      }).then(({ code, message }) => {
        if (code === 0) {
          toast.success(message);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setChangedItems({});
        setOpen(o);
      }}
    >
      <DialogContent
        className="lg:max-w-md 2xl:max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("rebateSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="max-h-[50dvh] overflow-auto rounded-sm border">
          <ScrollableTable className="relative">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0">
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("rebate")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBodyWrapper
              data={data ?? []}
              handleChange={(gameId, value) => handleChange(gameId, value)}
              setIsValid={setIsValid}
            />
          </ScrollableTable>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{translations("cancel")}</Button>
          </DialogClose>
          <Button
            disabled={
              isPending || Object.keys(changedItems).length === 0 || !isValid
            }
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 表格主体包装器组件
 * @param data - 游戏配置数据
 * @param handleChange - 处理数值变化的回调函数
 */
function TableBodyWrapper({
  data,
  handleChange,
  setIsValid,
}: {
  data: GameConfig[] | [];
  handleChange: (gameId: number, value: string) => void;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}) {
  const translations = useTranslations();
  return (
    <TableBody>
      {data?.length > 0 ? (
        data
          ?.filter((item) => item.gameType === 61) // 仅显示gameType为61的项目
          .map((item) => (
            <TableRow key={item.gameId}>
              <TableCell>{item.gameName}</TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-2">
                  <Input
                    className="w-32"
                    defaultValue={item.backRate?.toString() ?? ""}
                    type="number"
                    step={0.01}
                    min={0}
                    required
                    max={item.maxBackRate ?? 0}
                    onChange={(e) => {
                      handleChange(item.gameId, e.target.value);
                    }}
                    onBlur={(e) => {
                      setIsValid(e.target.reportValidity());
                    }}
                  />
                  <span className="text-destructive">{`${item.maxBackRate ?? 0}%`}</span>
                </div>
              </TableCell>
            </TableRow>
          ))
      ) : (
        // 无数据显示
        <TableRow className="flex items-center justify-center">
          <TableCell
            colSpan={2}
            className="flex h-20 items-center justify-center"
          >
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
