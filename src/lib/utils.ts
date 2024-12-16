import { exportClick } from "@/api";
import { type ClassValue, clsx } from "clsx";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeDownload = async (
  searchParams: ReadonlyURLSearchParams,
  exportButtonCode: number,
) => {
  const params = {
    exportButtonCode: exportButtonCode,
    queryParams: JSON.stringify(
      Object.fromEntries(new URLSearchParams(searchParams.toString())),
    ),
  };
  const { code, message } = await exportClick(params);
  if (code === 0) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

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
