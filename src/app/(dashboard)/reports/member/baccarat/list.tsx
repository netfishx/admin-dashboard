import { CustomPagination } from "@/components/custom-pagination";
import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PageData } from "@/lib/types";
import { useTranslations } from "next-intl";

type GameRecord = {
  member_id: string; // 会员ID
  member_type: string; // 会员类别
  game_category: string; // 游戏种类
  game_name: string; // 游戏名称
  bet_count: number; // 下注笔数
  bet_amount: number; // 下注金额
  valid_amount: number; // 有效金额
  win_loss_amount: number; // 输赢金额
  cashback_amount: number; // 返水金额
  profit_loss_result: number; // 盈亏结果
  details: string; // 详情
};

const mockData: GameRecord[] = [
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
];

export function List({ data }: { data: PageData<GameRecord> }) {
  const t = useTranslations("report.member");
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("member_id")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("member_type")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("game_category")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("game_name")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("bet_count")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("bet_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("valid_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("win_loss_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("cashback_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("profit_loss_result")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("details")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData?.map((item) => (
                <TableRow key={item.member_id}>
                  <TableCell className="w-24 text-center">
                    {item.member_id}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.member_type}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.game_category}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.game_name}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.bet_count}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.bet_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.valid_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.win_loss_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.cashback_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.profit_loss_result}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
      <div className="pt-2">
        <CustomPagination total={0} currentPage={1} pageSize={10} />
      </div>
      <div className="pt-2 w-2/5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-24 text-center">
                {t("bet_count")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("bet_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("valid_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("win_loss_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("cashback_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("profit_loss_result")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-24 text-center">
                {mockData[0].bet_count}
              </TableCell>
              <TableCell className="w-24 text-center">
                {mockData[0].bet_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {mockData[0].valid_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {mockData[0].win_loss_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {mockData[0].cashback_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {mockData[0].profit_loss_result}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
