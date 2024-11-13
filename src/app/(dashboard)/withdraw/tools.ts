export function translateValue(
  value: number,
  map: Array<{
    value: number;
    label: string;
  }>,
): string {
  return map.find((item) => item.value === value)?.label || "--";
}

export const approverStatusDict = [
  {
    value: 0,
    label: "未处理",
  },
  {
    value: 1,
    label: "锁定中",
  },
  {
    value: 2,
    label: "已拒绝",
  },
  {
    value: 3,
    label: "已通过",
  },
];
export const withdrawModeDict = [
  {
    value: 0,
    label: "自动",
  },
  {
    value: 1,
    label: "手动",
  },
];
export const moneyStatusDict = [
  {
    value: 0,
    label: "转帐中",
  },
  {
    value: 1,
    label: "已到账",
  },
  {
    value: 2,
    label: "出款失败",
  },
];
export const userTypeDict = [
  {
    value: 0,
    label: "代理",
  },
  {
    value: 1,
    label: "会员",
  },
];
