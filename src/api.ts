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
  return await apiRequest<WithPagination & { data: AgentData[] }>({
    url: "/api/user",
    data,
  });
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
export interface Announcement {
  beginTime: string;
  endTime: string;
  content: string;
  createTime: string;
  type: string;
  language: string;
  status: string;
}
export async function getAnnouncement() {
  return await apiRequest<WithPagination & { data: Announcement[] }>({
    url: "/api/getUpAnnouncement",
  });
}
export async function saveAnnouncement(data: Announcement) {
  return await apiRequest({
    url: "/api/saveAnnouncement",
    method: "POST",
    data,
  });
}
