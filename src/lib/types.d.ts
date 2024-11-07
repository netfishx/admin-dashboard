export type Res<T> = {
  size: number;
  pages: number;
  total: number;
  list: any;
  code: number;
  data?: T;
  message?: string;
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
  id: string;
  gameType: number;
  gameId: number;
  videoLink: string;
  userId: string;
  userName: string;
  distributionAmount: number;
  distributionPercent: number;
  lobbyId: string;
  lobbyName: string;
  lobbyTypeId: string;
  lobbyTypeName: string;
};

export type RatioReportListTypes = {
  [key: string]: string | number | undefined | null | string[] | number[];
};

export type WithPagination = {
  page: number;
  size: number;
  total: number;
};
