export type Res<T> = {
  code: number;
  data?: T;
  message?: string;
};

export type User = {
  id: number;
  name: string;
  token: string;
};
