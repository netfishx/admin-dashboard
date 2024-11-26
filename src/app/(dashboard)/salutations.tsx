import welcome01 from "@/assets/images/welcome/welcome01.svg";
import welcome02 from "@/assets/images/welcome/welcome02.svg";
import welcome03 from "@/assets/images/welcome/welcome03.svg";
import welcome04 from "@/assets/images/welcome/welcome04.svg";
import type { TodayWinLoss } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function Salutations({
  data,
}: { data: TodayWinLoss | undefined }) {
  const t = await getTranslations();
  return (
    <div className="flex flex-col p-4 rounded bg-card">
      <div className="pb-2 flex items-center justify-around">
        <Item
          name={t("baccaratShareAmount")}
          value={data?.baccaratShareAmount || "0"}
          icon={welcome01}
        />
        <Item
          name={t("backAmount")}
          value={data?.backAmount || "0"}
          icon={welcome02}
        />
        <Item
          name={t("supplierCost")}
          value={data?.supplierCost || "0"}
          icon={welcome03}
        />
        <Item
          name={t("grossProfitLoss")}
          value={data?.grossProfitLoss || "0"}
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
      className={`w-1/4 flex items-center ${unShowBorder ? "" : "border-r"} mr-4`}
    >
      <Image src={icon} alt="Icon" className="size-14" />
      <div className="pl-3">
        <div className="text-xs pb-2">{name}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};
