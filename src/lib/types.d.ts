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
  gameName?: string;
  videoLink: string;
  userId: string;
  userName?: string;
  distributionAmount: number;
  distributionPercent: number;
};

// 供应商列表
export type SupplierList = {
  id: string;
  username: string;
  nickname: string;
  remark: string;
  status: number;
  createTime: number;
  updateTime: number;
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
  content: { id?: string; language: string; title?: string; content: string }[];
  status: string;
  startTime: number | null;
  endTime: number | null;
};
// 公告列表请求 全平台
export type AnnouncementListRequest = {
  pageSize: number;
  pageNum: number;
  userId?: string;
  startTime?: number;
  endTime?: number;
};
// 公告列表请求 本级
export type AnnouncementAgentListRequest = {
  level: number | string;
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
  content: { id?: string; language: string; content: string; title?: string }[];
  contentOfLanguage: string;
  titleOfLanguage: string;
  status: number;
  createTime: number;
  updateTime: number;
};

export type PeriodReport = {
  pageSize: number;
  pageNum: number;
  startTime: number;
  endTime: number;
  issueNumber: string;
  gameTypeName: string;
  gameName: string;
};

export type PeriodReportList = WithPagination & {
  issueNumber: string;
  openTime: string;
  gameTypeName: string;
  gameName: string;
  betNum: number | string;
  betAmount: number | string;
  tieAmount: number | string;
  pairBetAmount: number | string;
  validBetAmount: number | string;
  memberBackAmount: number | string;
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

export type ApplyData = {
  id: string;
  orderNo: string;
  userId: string;
  userType: number;
  username: string;
  nickname: string;
  parentAccount: string;
  withdrawMoney: string;
  applyTime: string;
  approverName: string;
  approverStatus: number;
  withdrawMode: number;
  moneyStatus: number;
};

export type ApplyListRequest = {
  startTime: number;
  endTime: number;
  approverStatus?: number | null;
  pageNum: number;
  pageSize: number;
  userId?: string | null;
  parentAccount?: string | null;
};
// 供应商报表出参
export type SupplierReportRecords = {
  supplierId: string; // 供应商ID
  analysisTime: number; // 日期（时间戳格式）
  gameName: string; // 游戏名称
  gameId: number; // 游戏ID
  betNum: number; // 下注笔数
  validAmount: number; // 有效金额
  shareAmount: number; // 比例分成金额
  totalBetNum: number; // 累计下注笔数
  totalValidAmount: number; // 累计有效金额
  totalShareAmount: number; // 累计比例分成金额
};

// 供应商报表请求入参
export type SupplierReportRequestParams = {
  startTime: number;
  endTime: number;
};

export type AuditList = {
  id: string;
  orderNo: string;
  createTime: number;
  orderType: string;
  userId: string;
  orderAmount: string;
  auditMultiple: string;
  availableAudit: string;
  remainingAudit: string;
  status: string;
};
export type AuditListRequest = {
  startTime: number;
  endTime: number;
  id?: string | null;
  userId?: string | null;
  pageNum: number;
  pageSize: number;
};

// 会员报表-真人视讯请求入参
export type MemberReportRequestParams = {
  gameId?: number; // 游戏ID（不传时为全部游戏）
  startTime?: number; // 开奖开始时间（必传）
  endTime?: number; // 开奖结束时间（必传）
  pageNum?: number; // 第几页
  pageSize?: number; // 每页大小
  parentAgentId?: string | number; // 上级代理ID
  memberId?: string | number; // 会员ID
};

// 会员报表-真人视讯出参
export type MemberReportsRecord = {
  memberId: string;
  memberTypeName: string;
  dataLink: string[];
  gameId: number;
  betNum: number;
  memberBetAmount: string;
  availableBetAmount: string | null;
  winLossAmount: string;
  pureBackAmount: string;
  profitLossAmount: string;
  totalBetNum: number;
  totalMemberBetAmount: string;
  totalAvailableBetAmount: string | null;
  totalWinLossAmount: string;
  totalPureBackAmount: string;
  totalProfitLossAmount: string;
  total: number;
};

// 注单报表请求入参
export type OrderReportsRequestParams = {
  id?: string; // 订单id
  memberId?: string; // 会员id
  gameId?: string; // 游戏id
  startTime?: number; // 开始时间 as a long integer
  endTime?: number; // 结束时间 as a long integer
  issueNumber?: string; // 期号
  minister?: string; // 部长id
  roomOwnerId?: string; // 房主
  lastAgentId?: string; // 末级代理
  betAmount?: string; // 投注金额
  orderStatus?: 0 | 1; // 注单状态: 0 = 未结算, 1 = 已结算
  operators?: "0" | "1"; // 运算符 (operators), e.g., >= or <=
  pageNum?: number; // 页码, e.g., 1
  pageSize?: number; // 每页大小, e.g., 10
  key?: string; // Key (Description not provided)
};

// 注单报表出参
export type OrderReportsRecord = {
  id: string; // 订单号
  issueNumber: string; // 期号
  roomOwnerId: string; // 房主id, -1 means no owner
  lastAgentId: string; // 末级代理
  minister: string; // 部长id
  gameId: number; // 游戏id
  betType: number; // 投注玩法类型
  betAmount: string; // 下注金额
  winLossAmount: string; // 输赢钱
  betTime: number; // 投注时间 as a timestamp
  orderStatus: 1 | 2; // 注单状态, 1 = 未结算, 2 = 结算
  settleTime: number; // 计算时间 as a timestamp
  finalOdds: string; // 最终赔率
  memberId: string; // 会员id
  roomId: string; // 房间号, -1 means no room
  odds: { [key: string]: string }; // 投注赔率, dynamic keys with string values
};

// 占成拦货报表请求入参
export type RatioReportRequestParams = {
  agentId?: string; // 代理ID
  gameId?: number; // 游戏ID（不传时为全部游戏）
  houseOwnerId?: string; // 房主ID
  parentAgentId?: string; // 上级代理ID
  openStartTime?: number; // 开奖开始时间（必传）
  openEndTime?: number; // 开奖结束时间（必传）
  pageNum?: number; // 页码
  pageSize?: number; // 每页大小
};

// 占成拦货报表请求出参
export type RatioReportRequestRecords = {
  dataLink: string[]; // 数据链接数组
  userId: string; // 用户 ID
  userType: number; // 用户类型
  openTime: number; // 开盘时间（时间戳，毫秒级）
  gameId: number; // 游戏 ID
  gameName: string; // 游戏名称
  expectedShareAmount: number; // 应占成金额
  interceptAmount: number; // 拦截占成金额
  throwAmount: number; // 抛货金额
  actualShareWinLoss: number; // 占成盈亏金额
  backIncome: number; // 返水收入
  backOutcome: number; // 返水支出
  pureBackAmount: number; // 纯返水金额
  totalProfitLossAmount: number; // 总输赢金额
};

// 会员下注报表请求入参
export type MemberBetReportRequestParams = {
  agentId?: string; // 代理ID
  gameId?: number; // 游戏ID（不传时为全部游戏）
  openStartTime?: number; // 开奖开始时间（必传）
  openEndTime?: number; // 开奖结束时间（必传）
  pageNum?: number; // 页码
  pageSize?: number; // 每页条数
};

// 会员下注报表请求出参
export type MemberBetReportRequestRecords = {
  agentId: string; // 代理ID
  openTime: number; // 开盘时间（时间戳，毫秒级）
  gameId: number; // 游戏ID
  gameName: string; // 游戏名称
  betNum: number; // 投注数量
  dataLink: number[]; // 数据链接ID数组
  memberBetAmount: number; // 汇总当天会员的投注金额
  memberProfitLossAmount: number; // 汇总当天会员输赢金额
  expectedShareAmount: number; // 汇总应占成金额
  interceptAmount: number; // 汇总当天拦截占成金额
  throwAmount: number; // 汇总当天该末级代理抛货金额
  actualShareWinLoss: number; // 汇总占成盈亏金额
  backIncome: number; // 汇总当天返水收入
  backOutcome: number; // 汇总当天返水支出
  pureBackAmount: number; // 汇总当天返水
  totalProfitLossAmount: number; // 汇总当天总输赢金额
};

// 代理报表-棋牌-请求入参
export type PokerReportRequestParams = {
  agentId: string; // 代理ID
  romeType: number; // 房间类型 (不传的时候为全部游戏)
  startTime: number; // 开奖开始时间 (必须传) - timestamp
  endTime: number; // 开奖结束时间 (必须传) - timestamp
  pageNum: number; // 页码
  pageSize: number; // 每页条数
};

// 代理报表-棋牌-出参
export type PokerReportRequestRecords = {
  agentId: string; // 代理ID
  gameType: number; // 游戏类型
  roomType: number; // 房间类型
  issueAmount: number; // 期数
  settledAmount: string; // 结算金额
  totaSettledAmount: string; // 累计总结算金额
  totalIssueAmount: number; // 累计总期数
};

// 充值报表
export type RechargeReport = {
  id: string;
  orderNo: string;
  userId: string;
  userType: number;
  account: string;
  nickname: string;
  rechargeMoney: string;
  finishTime: number;
  rechargeHash: string;
  currency: string;
  createTime: number;
  updateTime: number;
};
// 充值报表请求入参
export type RechargeReportParams = {
  userId?: string | null;
  startTime?: number;
  endTime?: number;
  orderNo?: string | null;
  withdrawUserType?: number | null;
  operatorSymbol?: number | null;
  rechargeMoney?: number | null;
  requestStatus?: number | null;
  pageNum: number;
  pageSize: number;
};
// 提现报表
export type WithdrawReport = {
  id: string;
  orderNo: string;
  userId: string;
  userType: number;
  account: string;
  nickname: string;
  parentAccount: string;
  withdrawMoney: string;
  withdrawFee: string;
  withdrawWay: string;
  actualMoney: string;
  applyTime: number;
  approverId: string;
  approverName: string;
  approverTime: number;
  approverStatus: number;
  moneyStatus: number;
  finishTime: number;
  withdrawHash: string;
  currency: string;
  withdrawMode: number;
  createTime: number;
  updateTime: number;
  status: number;
};
// 提现报表请求入参
export type WithdrawReportParams = {
  startTime?: number;
  endTime?: number;
  orderNo?: string | null;
  operatorSymbol?: number | null;
  withdrawMoney?: number | null;
  pageNum: number;
  pageSize: number;
  requestStatus?: number | null;
};

// 归集地址列表
export type CollectionAddressListRecords = {
  account: string;
  address: string;
  addressType: number;
  coin: string;
  createTime: string;
  id: string;
  memberId: string;
  mnemonic: string[];
  privateKey: string;
  remark: string;
  status: number;
  updateTime: string;
};
// 归集地址列表请求入参
export type CollectionAddressListRequestParams = {
  currency: string;
  fixedFee: number;
  percentageFee: number;
  pageNum: number;
  pageSize: number;
};

export type Role = {
  id?: number;
  roleName: string;
  updateTime?: number;
  createBy?: string;
  roleType?: number;
  permsIds: number[];
};

export type Permission = {
  id: number;
  permsName: string;
  parentId?: number;
  permsType: number;
};

export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

// 注单详情-
export type OrderDetailType = {
  accountId: string; // 账户ID
  expectedShareAmount: string; // 预期分成金额，字符串类型，用于高精度计算
  expectedSharePercent: string; // 预期分成百分比，字符串类型
  actualShareAmount: string; // 实际分成金额，字符串类型
  percent: number; // 实际分成百分比，字符串类型
};

// 注单详情-
export type OrderItemDetailType = {
  id: string; // 唯一标识符
  shoeId: number; // 鞋子ID（可能是某种记录或分组ID）
  playId: number; // 播放ID（可能是某场游戏的ID）
  revenueShare: OrderDetailType[]; // 分成数据数组
  roomOwnerId: string; // 房间所有者ID（可能是 -1 表示默认值或未分配）
  lastAgentId: string; // 最近的代理ID
  gameId: number; // 游戏ID
  result: string; // 游戏结果数据，可能是某种序列化的字符串
  status: string | null; // 状态信息，可以为空
};

// 矿工费
export type OreFeeList = {
  account: string;
  address: string;
  addressType: number;
  coin: string;
  createTime: string;
  id: string;
  memberId: string;
  mnemonic: string[];
  privateKey: string;
  remark: string;
  status: number;
  trxBalance: string;
  updateTime: string;
  usdtBalance: string;
};

// 字典列表
export type DictionaryList = {
  id: string;
  dictName: string;
  dictCode: string;
  remark: string;
};

// 借还记录请求入参
export type BorrowRecordRequestParams = {
  /** 代理ID */
  agentId: string;

  /** 会员ID */
  memberId: string;

  /** 开始时间戳 */
  startTime: string;

  /** 结束时间戳 */
  endTime: string;

  /** 交易ID */
  transactionID: string;

  /**
   * 操作代码
   * 使用数字枚举可以更好地定义具体的操作类型
   */
  operateCode: number;

  /** 页码 */
  pageNum: number;

  /** 每页条数 */
  pageSize: number;
};

// 借还记录请求出参
export type BorrowRecordRequestRecords = {
  /** 交易ID - UUID格式 */
  transactionID: string;

  /** 代理ID */
  agentId: string;

  /** 会员ID */
  memberId: string;

  /**
   * 金额
   * 使用string类型避免浮点数精度问题
   */
  amount: string;

  /** 操作代码 */
  operateCode: number;

  /**
   * 创建时间
   * Unix时间戳(毫秒)
   */
  createTime: number;
};

// 提现手续费
export type WithdrawFeeList = {
  currency: string;
  fixedFee: number;
  percentageFee: number;
};

export type Subaccount = {
  id?: string;
  username?: string;
  createTime?: number;
  status?: number;
  lastLoginTime?: number;
  lastLoginIp?: string;
  roleList?: number[];
};
