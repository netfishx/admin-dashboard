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
export async function agentBaccaratReport(data: any) {
  return await apiRequest({ url: "/api/agentBaccaratReport", data });
}
export async function getAnnouncement<T>() {
  return await apiRequest<T>({ url: "/api/getUpAnnouncement" });
}
