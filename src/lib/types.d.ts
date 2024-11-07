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
