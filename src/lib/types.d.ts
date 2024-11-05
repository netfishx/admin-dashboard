export type Res<T> = {
  code: number;
  data?: T;
  message?: string;
};

export type User = {
  id: number;
  mainId: number;
  username: string;
  nickname: string;
  status: number;
  inviteCode: string;
  depositAddress: string;
  token: string;
  permissions: string[];
};
