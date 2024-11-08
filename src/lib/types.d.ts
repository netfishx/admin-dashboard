export type Res<T> = {
  code: number;
  data?: T;
  message?: string;
};

export type WithPagination = {
  pageNum: number;
  pageSize: number;
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
  percent?: number; //占成比例 %
  backRate?: number; // 反水比例 %
  holdStatus?: number; // 拦货状态 0关闭，1开启，
  maxPercent?: number; // 最大占城比例
  maxBackRate?: number; // 最大反水比例
  parentStatus?: number; // 父级（整条链路）的彩种开关
};

export type ChangeLog = {
  id: string; // 主键ID
  operateTime: number; // 操作时间
  userId: string; // 用户ID
  mainId: number; // 主用户ID
  userName: string; // 用户名
  userNickName: string; // 用户昵称
  createTime: number; // 操作时间
  appType: string; // 应用类型
  bizType: string; // 业务类型
  targetUserId: string; // 目标用户ID
  remoteIp: string; // 操作IP
  region: string; // 地区
  msg: string; // 变更内容
};
