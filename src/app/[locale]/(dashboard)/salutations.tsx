import { getI18n } from "@/locales/server";
import Image from "next/image";

import welcome01 from "@/assets/images/welcome/welcome01.svg";
import welcome02 from "@/assets/images/welcome/welcome02.svg";
import welcome03 from "@/assets/images/welcome/welcome03.svg";
import welcome04 from "@/assets/images/welcome/welcome04.svg";
import { unstable_noStore as noStore } from "next/cache";

export default async function Welcome(props: any) {
  noStore();
  const { user } = props;
  const t = await getI18n();
  return (
    <div className="flex-1 p-5 rounded border bg-card">
      <div className="pb-5 text-xl border-b">👏欢迎回来，{user.name}</div>
      <div className="w-full py-5 border-b flex items-center justify-around">
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
      <div className="pt-5">this is charts</div>
    </div>
  );
}

const Item = (props: any) => {
  const { name, value, icon, unShowBorder } = props;
  return (
    <div
      className={`w-1/4 h-[60px] flex items-center ${unShowBorder ? "" : "border-r"} mr-5`}
    >
      <Image src={icon} alt="Icon" className="size-14" />
      <div className="pl-3">
        <div className="text-xs pb-2">{name}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};
