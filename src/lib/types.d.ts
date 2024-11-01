export type Res<T> = {
  code: number;
  data?: T;
  message?: string;
};
