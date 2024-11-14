import type { MemberReportsRecord, PageData } from "@/lib/types";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

function CommonWrapper() {
  // const { data } = use(getSupplierReportList());

  const data = {
    pageNum: 1,
    pageSize: 10,
    total: 100,
    list: [
      {
        member_id: "M12345",
        member_type: "VIP",
        game_category: "Slots",
        game_name: "Lucky Spin",
        bet_count: 5,
        bet_amount: 500,
        valid_amount: 500,
        win_loss_amount: 200,
        cashback_amount: 10,
        profit_loss_result: 190,
        details: "Won some rounds",
      },
      {
        member_id: "M67890",
        member_type: "Regular",
        game_category: "Poker",
        game_name: "Texas Hold'em",
        bet_count: 3,
        bet_amount: 300,
        valid_amount: 300,
        win_loss_amount: -150,
        cashback_amount: 5,
        profit_loss_result: -145,
        details: "Lost some rounds",
      },
      {
        member_id: "M24680",
        member_type: "VIP",
        game_category: "Roulette",
        game_name: "European Roulette",
        bet_count: 2,
        bet_amount: 200,
        valid_amount: 200,
        win_loss_amount: 300,
        cashback_amount: 8,
        profit_loss_result: 308,
        details: "Big win on a lucky number",
      },
      {
        member_id: "M13579",
        member_type: "Regular",
        game_category: "Blackjack",
        game_name: "Classic Blackjack",
        bet_count: 4,
        bet_amount: 400,
        valid_amount: 400,
        win_loss_amount: -200,
        cashback_amount: 6,
        profit_loss_result: -194,
        details: "Lost majority of hands",
      },
      {
        member_id: "M11223",
        member_type: "Gold",
        game_category: "Baccarat",
        game_name: "Baccarat Pro",
        bet_count: 6,
        bet_amount: 600,
        valid_amount: 600,
        win_loss_amount: 50,
        cashback_amount: 12,
        profit_loss_result: 62,
        details: "Mixed results",
      },
    ],
  };

  return (
    <>
      <ListFilter />
      <List data={data || ({} as PageData<MemberReportsRecord>)} />
    </>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={<div>loading...</div>}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
