import type {
  AgentData,
  AnnouncementList,
  BackgroundImageList,
  BombDetailPlayerDetails,
  BombDetailRecords,
  ChangeLog,
  DictionaryItem,
  DictionaryList,
  GameConfig,
  GameOdds,
  LoginLog,
  MemberList,
  OrderReportsRecord,
  PageData,
  Role,
  Subaccount,
  Supplier,
  SupplierConfig,
  WithdrawFee,
} from "@/lib/types";
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
export const supplierConfigAtom = atom<SupplierConfig | undefined>();

// 用户管理-代理管理-用户信息弹窗
export const userInfoModalAtom = atom<boolean>(false);
// 用户管理-代理管理-转账弹窗
export const transferMoneyModalAtom = atom<boolean>(false);
// 用户管理-代理管理-游戏设置弹窗
export const gameSettingModalAtom = atom<boolean>(false);
export const gameSettingDataAtom = atom<GameConfig[]>();
// 用户管理-代理管理-限额设置弹窗
export const limitModalAtom = atom<boolean>(false);
export const limitGamesAtom = atom<GameConfig[]>();
export const limitDataAtom = atom<GameOdds[]>();
// 用户管理-代理管理-返水设置弹窗
export const rebateModalAtom = atom<boolean>(false);
export const rebateDataAtom = atom<GameConfig[]>();
// 用户管理-代理管理-登录日志弹窗
export const loginLogModalAtom = atom<boolean>(false);
export const loginLogDataAtom = atom<PageData<LoginLog>>();
// 用户管理-代理管理-变更日志弹窗
export const changeLogModalAtom = atom<boolean>(false);
export const changeLogDataAtom = atom<PageData<ChangeLog>>();
// 用户管理-代理管理-代理ID
export const agentIdAtom = atom<string>("");
// 用户管理-代理管理-代理数据
export const agentDataAtom = atom<AgentData | null>(null);
// 用户管理-代理管理-新增代理loading
export const addAgentLoadingAtom = atom<boolean>(false);

// 用户管理-会员管理-会员ID
export const memberIdAtom = atom<string>("");
// 用户管理-会员管理-会员信息数据
export const memberInfoDataAtom = atom<MemberList | null>(null);
export const availableAmountAtom = atom<number>(0);
// 用户管理-会员管理-会员信息弹窗
export const memberInfoModalAtom = atom<boolean>(false);
// 用户管理-会员管理-占成弹窗
export const ratioModalAtom = atom<boolean>(false);
export const ratioDataAtom = atom<GameConfig[]>();
// 用户管理-会员管理-增加授信弹窗
export const increaseCreditModalAtom = atom<boolean>(false);
// 用户管理-会员管理-减少授信弹窗
export const decreaseCreditModalAtom = atom<boolean>(false);
// 用户管理-会员管理-销账弹窗
export const deleteCreditModalAtom = atom<boolean>(false);

// 用户管理-供应商管理-编辑弹窗
export const supplierEditModalAtom = atom<boolean>(false);
// 用户管理-供应商管理-编辑数据
export const supplierEditDataAtom = atom<Supplier>();

// 维护-字典管理-编辑弹窗
export const editDictionaryDialogAtom = atom<boolean>(false);
// 维护-字典管理-编辑数据
export const dictionaryDataAtom = atom<DictionaryList | null>(null);
// 维护-字典管理-字典项弹窗
export const dictionaryItemDialogAtom = atom<boolean>(false);
// 维护-字典管理-新增字典项弹窗
export const addDictionaryItemDialogAtom = atom<boolean>(false);

export const deleteDictionaryItemDialogAtom = atom<boolean>(false);
// 维护-字典管理-新增字典项数据
export const addDictionaryItemDataAtom = atom<{
  id: string;
  dictCode: string;
  label?: string;
  value?: string;
  remark?: string;
}>();
// 维护-字典管理-字典项操作
export const dictionaryItemOperationAtom = atom<"add" | "edit">();
export const dictionaryItemDataAtom = atom<DictionaryItem[]>([]);

// 维护-资源管理-背景图弹窗
export const backgroundImageDialogAtom = atom<boolean>(false);
// 维护-资源管理-背景图数据
export const backgroundImageDataAtom = atom<BackgroundImageList | null>(null);

// 公告弹窗
export const contentModalAtom = atom<boolean>(false);
export const contentModalDataAtom = atom<AnnouncementList | null>(null);
export const contentEditModalAtom = atom<boolean>(false);
export const editModalTitleAtom = atom<string>("");

export const holdStatusAtom = atom<
  {
    gameId: number;
    gameName?: string;
    holdStatus: number;
  }[]
>([]);
export const ratioAtom = atom<
  {
    gameId: number;
    gameName?: string;
    percent: string;
    maxPercent: string;
  }[]
>([]);
export const rebateAtom = atom<
  {
    gameId: number;
    gameName?: string;
    backRate: string;
    maxBackRate: string;
  }[]
>([]);
export const oddsAtom = atom<{
  [key: string]: number;
}>({});
export const verifyLimitAtom = atom<boolean>(true);
export const limitAtom = atom<{
  [key: string]: {
    minBet?: number;
    maxBet?: number;
    maxBetLimit?: number | null;
    maxBetPeriod?: number;
    maxBetPeriodLimit?: number | null;
  };
}>({});
export const changedOddsLimitAtom = atom<string[]>([]);

export const roleAtom = atom<Role | null>(null);
export const roleDialogAtom = atom<boolean>(false);
export const roleDeleteAtom = atom<string | null>(null);
export const roleDeleteDialogAtom = atom<boolean>(false);

export const subaccountAtom = atom<Subaccount | null>(null);
export const subaccountDialogAtom = atom<boolean>(false);
export const subaccountDeleteAtom = atom<string | null>(null);
export const subaccountDeleteDialogAtom = atom<boolean>(false);
export const subaccountIdAtom = atom<string>("");

// 报表管理-注单列表-棋牌-注单详情弹窗
export const orderListGuandanDetailDialogAtom = atom<boolean>(false);
export const orderListGuandanDetailDataAtom =
  atom<PageData<BombDetailRecords>>();
// 报表管理-注单列表-棋牌-炸弹详情弹窗
export const orderListGuandanBombDetailDialogAtom = atom<boolean>(false);
export const guandanOrderIdAtom = atom<string>();

// 报表管理-注单列表-冠单-炸弹详情数据
export const guandanBombDetailAtom = atom<BombDetailPlayerDetails[]>([]);

// 提现-申请-流水弹窗
export const withdrawFlowDialogAtom = atom<boolean>(false);
// 提现-申请-流水弹窗-数据
export const withdrawFlowDataAtom = atom<PageData<OrderReportsRecord> | null>(
  null,
);
// 提现-申请-流水弹窗-数据
export const orderParmasAtom = atom<{
  agentId?: string;
  memberId?: string;
} | null>(null);
// 报表管理-会员报表-真人视讯-代理ID
export const memberListBaccaratAgentIdAtom = atom<string>("");

export const withdrawFeeAtom = atom<WithdrawFee>();

export const collectionAddressDialogAtom = atom<boolean>(false);
