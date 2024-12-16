import welcome01 from "@/assets/images/welcome/welcome01.svg";
import welcome02 from "@/assets/images/welcome/welcome02.svg";
import welcome03 from "@/assets/images/welcome/welcome03.svg";
import welcome04 from "@/assets/images/welcome/welcome04.svg";
import type { TodayWinLoss } from "@/lib/types";
import { Big } from "big.js";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";

export async function Salutations({
  data,
}: {
  data: TodayWinLoss | undefined;
}) {
  const t = await getTranslations();
  const format = await getFormatter();
  return (
    <div className="flex flex-col rounded bg-card p-4">
      <div className="flex items-center justify-around pb-2">
        <Item
          name={t("baccaratShareAmount")}
          value={format.number(
            Big(data?.baccaratShareAmount ?? 0)
              .round(2, 0)
              .toNumber(),
          )}
          icon={welcome01}
        />
        <Item
          name={t("backAmount")}
          value={format.number(
            Big(data?.backAmount ?? 0)
              .round(2, 0)
              .toNumber(),
          )}
          icon={welcome02}
        />
        <Item
          name={t("supplierCost")}
          value={format.number(
            Big(data?.supplierCost ?? 0)
              .round(2, 0)
              .toNumber(),
          )}
          icon={welcome03}
        />
        <Item
          name={t("grossProfitLoss")}
          value={format.number(
            Big(data?.grossProfitLoss ?? 0)
              .round(2, 0)
              .toNumber(),
          )}
          icon={welcome04}
          unShowBorder
        />
      </div>
    </div>
  );
}

const Item = ({
  name,
  value,
  icon,
  unShowBorder,
}: {
  name: string;
  value: string;
  icon: string;
  unShowBorder?: boolean;
}) => {
  return (
    <div
      className={`flex w-1/4 items-center ${unShowBorder ? "" : "border-r"} mr-4`}
    >
      <Image src={icon} alt="Icon" className="size-14" />
      <div className="pl-3">
        <div className="pb-2 text-xs">{name}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};
