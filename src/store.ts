import { atom } from "jotai";

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
