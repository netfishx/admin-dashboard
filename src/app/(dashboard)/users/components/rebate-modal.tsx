"use client";

import { getGameConfig, updateAgentGameConfig } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { rebateModalAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

/**
 * 返点设置模态框组件
 * @param userId - 用户ID
 */
export function RebateModal({ userId }: { userId: string }) {
  const translations = useTranslations();
  const t = useTranslations("users.agents");

  const [open, setOpen] = useAtom(rebateModalAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<GameConfig[] | undefined>();
  const router = useRouter();
  const [initialData, setInitialData] = useState<GameConfig[] | undefined>();

  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      getGameConfig(userId).then(({ code, data, message }) => {
        setLoading(false);
        if (code === 0 && data) {
          setData(data);
          setInitialData(data);
        } else {
          toast.error(message);
        }
      });
    }
  }, [userId, open]);

  const handleChange = (gameId: number, value: string) => {
    if (data) {
      const list = data.map((item) => {
        if (item.gameId === gameId) {
          return {
            ...item,
            backRate:
              Number(value) > (Number(item.maxBackRate) ?? 0)
                ? item.maxBackRate
                : value,
          };
        }
        return item;
      });
      setData(list);
    }
  };

  const hasChanges = () => {
    if (!(data && initialData)) {
      return false;
    }
    return data.some((item) => {
      const initialItem = initialData.find((i) => i.gameId === item.gameId);
      return initialItem && initialItem.backRate !== item.backRate;
    });
  };

  const getChangedItems = () => {
    if (!(data && initialData)) {
      return [];
    }
    return data.filter((item) => {
      const initialItem = initialData.find((i) => i.gameId === item.gameId);
      return initialItem && initialItem.backRate !== item.backRate;
    });
  };

  const handleConfirm = () => {
    if (data) {
      const changedItems = getChangedItems();
      if (changedItems.length === 0) {
        setOpen(false);
        return;
      }

      updateAgentGameConfig({
        userId,
        list: changedItems,
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
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("rebateSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm overflow-auto max-h-[50dvh]">
          <ScrollableTable className="relative">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0">
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("rebate")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <RebateSkeleton />
            ) : (
              <TableBodyWrapper
                data={data ?? []}
                handleChange={(gameId, value) => handleChange(gameId, value)}
              />
            )}
          </ScrollableTable>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button
            disabled={isPending || !hasChanges()}
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 加载状态骨架屏组件
 */
function RebateSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 骨架屏使用索引作为key是可以接受的
        <TableRow key={index}>
          <TableCell colSpan={2}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
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
}: {
  data: GameConfig[] | [];
  handleChange: (gameId: number, value: string) => void;
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
                    value={item.backRate}
                    type="number"
                    step={0.01}
                    min={0}
                    max={item.maxBackRate ?? 0}
                    onChange={(e) => {
                      handleChange(item.gameId, e.target.value);
                    }}
                  />
                  <span className="text-destructive">{`${item.maxBackRate ?? 0}%`}</span>
                </div>
              </TableCell>
            </TableRow>
          ))
      ) : (
        // 无数据显示
        <TableRow className="flex justify-center items-center">
          <TableCell
            colSpan={2}
            className="flex justify-center items-center h-20"
          >
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
