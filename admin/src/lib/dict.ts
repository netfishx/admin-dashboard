// 用户类型
export const USER_TYPE = [
  {
    value: 0,
    label: "agent",
  },
  {
    value: 2,
    label: "member",
  },
];
// 审核状态
export const WITHDRAW_STATUS = [
  {
    value: 0,
    label: "unprocessed", // 未处理
  },
  {
    value: 1,
    label: "locked", // 锁定
  },
  {
    value: 2,
    label: "rejected", // 拒绝
  },
  {
    value: 3,
    label: "passed",
  },
];
// 账变类型
export const CHANGE_TYPE = [
  {
    value: 1,
    label: "lotteryBet",
  },
  {
    value: 3,
    label: "deposit",
  },
  // {
  //   value: 4,
  //   label: "withdrawal",
  // },
  {
    value: 5,
    label: "withdrawalCompleted",
  },
  // {
  //   value: 6,
  //   label: "withdrawalReturned",
  // },
  // {
  //   value: 7,
  //   label: "createWallet",
  // },
  {
    value: 8,
    label: "issueRebate",
  },
  {
    value: 9,
    label: "lotterySettlement",
  },
  {
    value: 10,
    label: "guandanSettlement",
  },
  {
    value: 11,
    label: "closeRoom",
  },
  {
    value: 12,
    label: "roomRecharge",
  },
  {
    value: 13,
    label: "receiveRebate",
  },
  {
    value: 15,
    label: "borrow",
  },
  {
    value: 16,
    label: "repayment",
  },
  {
    value: 17,
    label: "createRoom",
  },
  {
    value: 18,
    label: "increaseCredit",
  },
  {
    value: 19,
    label: "decreaseCredit",
  },
  // {
  //   value: 20,
  //   label: "transfer",
  // },
  {
    value: 21,
    label: "writeOff",
  },
  {
    value: 22,
    label: "transferIn",
  },
  {
    value: 23,
    label: "transferOut",
  },
];

// 提现记录状态
export const STATUS = [
  {
    value: 1,
    label: "auditing",
  },
  {
    value: 2,
    label: "withdrawing",
  },
  {
    value: 3,
    label: "failed",
  },
  {
    value: 4,
    label: "success",
  },
];
// 出金模式
export const WITHDRAW_MODE = [
  {
    value: 0,
    label: "auto",
  },
  {
    value: 1,
    label: "manual",
  },
];
// 资金状态
export const MONEY_STATUS = [
  {
    value: 0,
    label: "transferred",
  },
  {
    value: 1,
    label: "received",
  },
  {
    value: 2,
    label: "exception",
  },
];
// 业务订单类型
export const ORDER_TYPE = [
  {
    value: 0,
    label: "deposit",
  },
  {
    value: 1,
    label: "issueRebate",
  },
];
// 稽核状态
export const AUDIT_STATUS = [
  {
    value: 0,
    label: "uncompleted",
  },
  {
    value: 1,
    label: "completed",
  },
  {
    value: 2,
    label: "manualCleared",
  },
];
// 公告类型
export const NOTICE_TYPE = [
  {
    value: 1,
    label: "platformAgentAnnouncement",
  },
  {
    value: 2,
    label: "platformMemberAnnouncement",
  },
  {
    value: 3,
    label: "agentAnnouncement",
  },
  {
    value: 4,
    label: "memberAnnouncement",
  },
  {
    value: 5,
    label: "systemConfigNotice",
  },
  {
    value: 6,
    label: "agentCommissionNotice",
  },
  {
    value: 7,
    label: "agentRebateNotice",
  },
];

// 公告状态
export const NOTICE_STATUS = [
  {
    value: 0,
    label: "disable",
  },
  {
    value: 1,
    label: "enable",
  },
];

// 上传背景图
export const PORT = [
  {
    value: 0,
    label: "gameport",
  },
];

// 上传背景图
export const POSITION = [
  {
    value: 0,
    label: "home",
  },
];

// 语言
export const LANGUAGE = [
  {
    value: "zh-CN",
    label: "chinese",
  },
];

//  归集地址状态
export const COLLECTION_STATUS = [
  {
    value: 0,
    label: "disable",
  },
  {
    value: 1,
    label: "enable",
  },
  {
    value: 2,
    label: "locked",
  },
];

// 借还记录操作类型
export const OPERATE_TYPE = [
  {
    value: 15,
    label: "borrow",
  },
  {
    value: 16,
    label: "repayment",
  },
  {
    value: 21,
    label: "writeOff",
  },
];

// 授信类型
export const CREDIT_OPERATE_TYPE = [
  {
    value: 18,
    label: "addCredit",
  },
  {
    value: 19,
    label: "reduceCredit",
  },
];

// 转账类型
export const TRANSFER_TYPE = [
  {
    value: 1,
    label: "notSettled",
  },
  {
    value: 2,
    label: "settled",
  },
];

// 注单列表-真人视讯 下注结果 0-和 1-赢 2-输
export const SETTLE_RESULT = [
  {
    value: 0,
    label: "tie",
  },
  {
    value: 1,
    label: "win",
  },
  {
    value: 2,
    label: "lose",
  },
];
