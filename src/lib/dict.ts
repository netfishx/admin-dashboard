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
  {
    value: 4,
    label: "withdrawal",
  },
  {
    value: 5,
    label: "withdrawalCompleted",
  },
  {
    value: 6,
    label: "withdrawalReturned",
  },
  {
    value: 7,
    label: "createWallet",
  },
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
  {
    value: 20,
    label: "transfer",
  },
  {
    value: 21,
    label: "writeOff",
  },
];

// 提现记录状态
export const STATUS = [
  {
    value: 0,
    label: "auditing",
  },
  {
    value: 1,
    label: "withdrawing",
  },
  {
    value: 2,
    label: "failed",
  },
  {
    value: 3,
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
