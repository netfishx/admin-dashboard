import { apiRequest } from "./lib/request";

export interface AgentData {
  upUserName: string;
  userLevel: string;
  userId: string;
  userName: string;
  nickName: string;
  status: number;
}

export async function getAgents() {
  return await apiRequest({ url: "/api/user" });
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
