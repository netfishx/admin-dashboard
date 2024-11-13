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

export type Game = {
  gameId: number;
  gameIdLabel: string;
};

export type GameType = {
  gameType: number;
  gameTypeLabel: string;
  list: Game[];
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
export interface AgentData {
  upUsername: string;
  deptId: number;
  id: string;
  username: string;
  nickname: string;
  status: number;
}
export type MemberList = {
  id: string;
  level: string;
  username: string;
  nickname: string;
  status: number;
  upUsername: string;
  debtAmount: number;
  creditAmount: number;
  depositAddress: string;
};

export interface LoginLog {
  userId: string;
  loginTime: string;
  ip: string;
  address: string;
  status: number;
}

export type GameConfig = {
  gameType?: number;
  gameId: number;
  gameName?: string;
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
  oddsLabel?: string; // 赔率名称
  odds?: string; // 赔率
  betType: number; // 投注类型
  minBet?: number; // 最低投注金额
  maxBet?: number; // 最大投注金额
  maxBetLimit?: number; // 最大投注金额上限
  maxBetPeriod?: number; // 每局最大投注额度
  maxBetPeriodLimit?: number; // 每局最大投注额度上限
  canEdit?: boolean; // 限红是否可修改 true=可编辑，false不可编辑
  groupId?: number; // 限红分组id，同样的id 限红一起改
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

// 公告新增 编辑
export type Announcement = {
  id?: string | null; // 编辑时传
  type: string;
  content: { language: string; content: string }[];
  status: string;
  startTime: number | null;
  endTime: number | null;
};
// 公告列表请求 全平台
export type AnnouncementListRequest = {
  pageSize: number;
  pageNum: number;
  userId?: string;
  startTime?: string;
  endTime?: string;
};
// 公告列表请求 本级
export type AnnouncementAgentListRequest = {
  level: number | string;
  language: string;
  pageSize: number;
  pageNum: number;
};

// 公告列表返回
export type AnnouncementList = {
  id: string;
  userId: string;
  type: number;
  startTime: number;
  endTime: number;
  language: string;
  content: string;
  status: number;
  createTime: number;
  updateTime: number;
};

export type PeriodReport = {
  page: number;
  size: number;
  startTime: string;
  endTime: string;
  issueNumber: string;
  gameTypeName: string;
  gameName: string;
};

// 个人中心-基本信息
export type UserBasicInfo = {
  userId: string; // User ID as a string
  userAccount: string; // User account name
  inviteCode: string; // Invite code
  totalBalanceMoney: number; // Total balance money
  usableBalanceMoney: number; // Usable balance money
  gameFreezeMoney: number; // Amount frozen for game-related activities
  totalCreditMoney: number; // Total credit money
  memberToBeRepaidMoney: number; // Money to be repaid by the member
  memberUnusedMoney: number; // Unused money by the member
  withdrawFreezeMoney: number; // Amount frozen for withdrawal
  chainAddress: string; // Blockchain address
};

// 提现表单数据
export type WithdrawFormData = {
  availableAmount: string;
  withdrawMoney: string;
  withdrawFee: string;
  withdrawWay: string;
  secret: string;
};
