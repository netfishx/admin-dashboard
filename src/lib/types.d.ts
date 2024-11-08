export type Res<T> = {
  code: number;
  data?: T;
  message?: string;
};

export type WithPagination = {
  page: number;
  size: number;
  total: number;
};

export type PageData<T> = WithPagination & {
  list: T[];
};

export type User = {
  id: string;
  mainId: string;
  username: string;
  nickname: string;
  status: number;
  inviteCode: string;
  depositAddress: string;
  token: string;
  permissions: string[];
};

export type SupplierConfig = {
  id?: string;
  gameType: number;
  gameId: number;
  videoLink: string;
  userId: string;
  userName?: string;
  distributionAmount: number;
  distributionPercent: number;
};

export type MaintainGame = {
  id: string;
  gameType: number;
  gameId: number;
  status: number;
  gameName: string;
  updateTime: number;
  updateBy: string;
  updateUserId: string;
};

export type RatioReportListTypes = {
  [key: string]: string | number | undefined | null | string[] | number[];
};

export type GameConfig = {
  gameType?: number;
  gameId: number;
  status?: number; //彩种开关 0 关闭1=开启
  percent?: string; //占成比例 %
  backRate?: string; // 反水比例 %
  holdStatus?: number; // 拦货状态 0关闭，1开启，
  maxPercent?: string; // 最大占城比例
  maxBackRate?: string; // 最大反水比例
  parentStatus?: number; // 父级（整条链路）的彩种开关
};

export type GameOdds = {
  oddsType: number; // 赔率id
  odds: string; // 赔率
  betType: number; // 投注类型
  minBet: number; // 最低投注金额
  maxBet: number; // 最大投注金额
  maxBetLimit: number; // 最大投注金额上限
  maxBetPeriod: number; // 每局最大投注额度
  maxBetPeriodLimit: number; // 每局最大投注额度上限
  canEdit: boolean; // 限红是否可修改 true=可编辑，false不可编辑
  groupId: number; // 限红分组id，同样的id 限红一起改
};
