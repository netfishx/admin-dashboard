import Image from "next/image";

import welcome01 from "@/assets/images/welcome/welcome01.svg";
import welcome02 from "@/assets/images/welcome/welcome02.svg";
import welcome03 from "@/assets/images/welcome/welcome03.svg";
import welcome04 from "@/assets/images/welcome/welcome04.svg";
import { useTranslations } from "next-intl";
import WeekChart from "./week-chart";

export function Salutations(props: any) {
  const { user } = props;
  const t = useTranslations();
  return (
    <div className="flex-1 flex flex-col p-4 rounded bg-card">
      <div className="border-b pb-2 flex items-center justify-around">
        <Item
          name={t("gameTotalProfit")}
          value={user.data.value1}
          icon={welcome01}
        />
        <Item
          name={t("totalDeposit")}
          value={user.data.value2}
          icon={welcome02}
        />
        <Item
          name={t("totalWithdrawal")}
          value={user.data.value3}
          icon={welcome03}
        />
        <Item
          name={t("newMembers")}
          value={user.data.value4}
          icon={welcome04}
          unShowBorder
        />
      </div>
      <WeekChart />
    </div>
  );
}

const Item = (props: any) => {
  const { name, value, icon, unShowBorder } = props;
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
