import { atom } from "jotai";

export const countAtom = atom(0);

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
