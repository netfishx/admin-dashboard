"use server";

import { apiRequest } from "@/lib/request";
import { getSession } from "@/session";

export interface AgentData {
  upUsername: string;
  deptId: number;
  userId: string;
  username: string;
  nickname: string;
  status: number;
}

export async function login(data: {
  username: string;
  password: string;
  code: string;
  randomStr: string;
}) {
  const res = await apiRequest<{
    userDetail: {
      id: string;
      mainId: string;
      username: string;
      nickname: string;
      status: number;
      inviteCode: string;
      depositAddress: string;
    };
    accessToken: string;
    permissions: string[];
  }>({
    url: "/agent/login",
    method: "POST",
    data: {
      username: data.username,
      password: data.password,
      captchaImg: data.code,
      captchaUuid: data.randomStr,
    },
    header: {
      Authorization: "234234234",
    },
  });
  return {
    ...res,
    data: res.data
      ? {
          id: res.data.userDetail.id,
          mainId: res.data.userDetail.mainId,
          username: res.data.userDetail.username,
          nickname: res.data.userDetail.nickname,
          status: res.data.userDetail.status,
          inviteCode: res.data.userDetail.inviteCode,
          depositAddress: res.data.userDetail.depositAddress,
          token: res.data.accessToken,
          permissions: res.data.permissions,
        }
      : null,
  };
}
export async function logout() {
  const user = await getSession();
  return await apiRequest({
    url: "/security/logout",
    method: "POST",
    token: user?.token,
  });
}

export async function getAgents(data: any) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: AgentData[] }>({
    url: "/user",
    data,
    token: user?.token,
  });
}
// 获取单个代理信息
export async function getAgentInfo(params: { id: string }) {
  const user = await getSession();
  return await apiRequest<AgentData>({
    url: "/agent/user/main/getById",
    params,
    token: user?.token,
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
  startTime: string;
  endTime: string;
  content: string;
  createTime: string;
  type: string;
  language: string;
  status: string;
}
export async function getAnnouncement(params: any) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: Announcement[] }>({
    url: "/announcements",
    params,
    token: user?.token,
  });
}
export async function saveAnnouncement(data: Announcement) {
  const user = await getSession();
  return await apiRequest({
    url: "/addAnnouncements",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getReviceOrder() {
  const user = await getSession();
  return await apiRequest<{ status: boolean }>({
    url: "/agent/reviceOrder",
    token: user?.token,
  });
}

export async function editReviceOrder({ status }: { status: boolean }) {
  const user = await getSession();
  return await apiRequest<{ status: boolean }>({
    url: "/agent/reviceOrder",
    method: "POST",
    data: { status },
    token: user?.token,
  });
}

export async function getDailiReport(data: any) {
  const user = await getSession();
  return await apiRequest({
    url: "/gareth/getDailiReport",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getRatioReport(data: any) {
  const user = await getSession();
  return await apiRequest({
    url: "/gareth/getRatioReport",
    method: "POST",
    data,
    token: user?.token,
  });
}
