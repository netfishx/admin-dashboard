import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  num: number,
  {
    minimumFractionDigits,
    maximumFractionDigits = 2,
  }: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
) {
  return new Intl.NumberFormat("en", {
    minimumFractionDigits,
    maximumFractionDigits,
    roundingMode: "floor",
  }).format(num);
}

export function uniq<T>(arr: readonly T[]): T[] {
  return Array.from(new Set(arr));
}
