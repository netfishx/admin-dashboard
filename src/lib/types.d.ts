export type Res<T> = {
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

export type SearchParams = {
  [key: string]: string | string[];
};

export type RatioReportListTypes = {
  [key: string]: string | number | undefined | null | string[] | number[];
};

export type RatioReportTypes = {
  list: RatioReportListTypes[];
};

export type WithPagination = {
  page: number;
  size: number;
  total: number;
};
