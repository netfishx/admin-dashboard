import { atom } from "jotai";
import type { Announcement } from "./api";
import type { SupplierConfig } from "./lib/types";

export const lastErrorTimeAtom = atom<number>(0);
export type Error = {
  error: boolean;
  time: number;
  message?: string;
};
export const errorAtom = atom<Error>({
  error: false,
  time: 0,
});
export const sidebarAtom = atom<boolean>(true);

export const gamesSupplierDialogAtom = atom<boolean>(false);
export const supplierConfigAtom = atom<SupplierConfig | undefined>();

// 用户管理-代理管理-用户信息弹窗
export const userInfoModalAtom = atom<boolean>(false);
// 用户管理-代理管理-游戏设置弹窗
export const gameSettingModalAtom = atom<boolean>(false);
// 用户管理-代理管理-限额设置弹窗
export const limitModalAtom = atom<boolean>(false);
// 用户管理-代理管理-返水设置弹窗
export const rebateModalAtom = atom<boolean>(false);
// 用户管理-代理管理-登录日志弹窗
export const loginLogModalAtom = atom<boolean>(false);
// 用户管理-代理管理-代理ID
export const agentIdAtom = atom<string>("");
// 公告弹窗
export const contentModalAtom = atom<boolean>(false);
export const contentModalDataAtom = atom<Announcement | null>(null);
export const contentEditModalAtom = atom<boolean>(false);
export const editModalTitleAtom = atom<string>("");

export const holdStatusAtom = atom<
  {
    gameId: number;
    holdStatus: number;
  }[]
>([]);
