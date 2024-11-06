import { atom } from "jotai";
import type { Announcement } from "./api";

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
export const gamesSupplierEditAtom = atom<{
  game: string;
  supplierId: string;
}>();

// 用户信息弹窗
export const userInfoModalAtom = atom<boolean>(false);
// 登录日志弹窗
export const loginLogModalAtom = atom<boolean>(false);
export const agentIdAtom = atom<string>("");
// 公告弹窗
export const contentModalAtom = atom<boolean>(false);
export const contentModalDataAtom = atom<Announcement | null>(null);
export const contentEditModalAtom = atom<boolean>(false);
