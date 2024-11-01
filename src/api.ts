import { apiRequest } from "./lib/request";

export interface AgentData {
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: number;
}

export async function getAgents(data: any) {
  return await apiRequest<{
    list: AgentData[];
    total: number;
    page: number;
    size: number;
  }>({ url: "/api/user", data });
}
export async function updateUser(data: AgentData) {
  return await apiRequest({ url: "/api/updateUser", method: "PUT", data });
}
export async function addUser(data: AgentData) {
  return await apiRequest({ url: "/api/addUser", method: "POST", data });
}

export interface WithPagination {
  total: number;
  page: number;
  size: number;
}
export interface LoginLog {
  userId: string;
  loginTime: string;
  ip: string;
  address: string;
  status: number;
}
export async function getLoginLog(data: any) {
  return await apiRequest<WithPagination & { data: LoginLog[] }>({
    url: "/api/getLoginLog",
    data,
  });
}
export async function agentBaccaratReport(data: any) {
  return await apiRequest({ url: "/api/agentBaccaratReport", data });
}
