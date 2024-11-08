"use server";

import { apiRequest } from "@/lib/request";
import type {
  ChangeLog,
  GameConfig,
  MaintainGame,
  PageData,
  SupplierConfig,
} from "@/lib/types";
import { getSession } from "@/session";
import type { RatioReportListTypes } from "./lib/types";

export interface AgentData {
  upUsername: string;
  deptId: number;
  id: string;
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

// 用户管理-代理管理-获取代理列表
export async function getAgents(params: { page: number; size: number }) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: AgentData[] }>({
    url: "/agent/user/main/getUnderAgent",
    params,
    token: user?.token,
  });
}
// 用户管理-代理管理-获取单个代理信息
export async function getAgentInfo(params: { id: string }) {
  const user = await getSession();
  return await apiRequest<AgentData>({
    url: "/agent/user/main/getById",
    params,
    token: user?.token,
  });
}
export async function updateAgent(data: {
  id: string;
  username?: string;
  nickname?: string;
  status?: number;
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/user/main/update",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 用户管理-代理管理-重置代理返水次数
export async function resetRestCount(data: { id: string }) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/user/main/cleanLoginError",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 用户管理-代理管理-添加代理
export async function addAgent(data: {
  upUsername?: string;
  username: string;
  nickname: string;
  password: string;
}) {
  const user = await getSession();
  return await apiRequest({
    token: user?.token,
    url: "/agent/user/main/createAccount",
    method: "POST",
    data,
  });
}

// 用户管理-代理管理-获取代理游戏设置
export async function getAgentConfig(params: { userId: string }) {
  const user = await getSession();
  return await apiRequest<{ list: GameConfig[] }>({
    url: "/agent/game/config/list",
    params,
    token: user?.token,
  });
}
// 用户管理-代理管理-更新代理游戏设置
export async function updateAgentGameConfig(data: {
  userId: string;
  list: GameConfig[];
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/game/config/update",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 用户管理-代理管理-获取代理变更日志
export async function getChangeLog(params: {
  targetUserId: string;
  appType: string;
  pageNum?: number;
  pageSize?: number;
}) {
  // const user = await getSession();
  const user = {
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBR0VOVCIsImlhdCI6MTczMDk2ODk1NywidXNlcl9pZCI6IjgiLCJ1c2VyX2xvZ2luX3VuaXF1ZV9mbGFnIjoiODYzMjQ5NjItYWFiMS00YmE2LTk4ZjItZmQxODNlMjkzNjAzIn0.pGx1pnzbo8jimxNCOXWi1yYZHigx5H2JHbxciy6h1Us",
  };
  return await apiRequest<PageData<ChangeLog>>({
    url: "/operateLog/list",
    params,
    token: user?.token,
  });
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
  id?: string;
  startTime: string;
  endTime: string;
  content: string;
  type: string;
  language: string;
  status: string;
}
export async function getAnnouncement(params: Announcement) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: Announcement[] }>({
    url: "/announcements",
    params,
    token: user?.token,
  });
}
// 系统管理-公告管理-添加公告/编辑公告
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

export async function getSupplierConfigs(userId?: string) {
  const user = await getSession();
  return await apiRequest<SupplierConfig[]>({
    url: "/supplierConf/list",
    token: user?.token,
    params: { userId },
  });
}

export async function editSupplierConfig(data: SupplierConfig) {
  const user = await getSession();
  return await apiRequest({
    url: "/supplierConf/save",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getMaintainList() {
  const user = await getSession();
  return await apiRequest<MaintainGame[]>({
    url: "/gameSwitch/list",
    token: user?.token,
  });
}

export async function editMaintain(data: {
  status: number;
  ids: string[];
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/gameSwitch/update",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getDailiReport(data: any) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: RatioReportListTypes[] }>({
    url: "/report/agent/baccarat/memberBet",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getRatioReport(data: any) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: RatioReportListTypes[] }>({
    url: "/report/agent/baccarat/stack",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getPeriodReport(params: any) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: Announcement[] }>({
    url: "/getReports",
    params,
    token: user?.token,
  });
}

export async function getGameConfig() {
  const user = await getSession();
  return await apiRequest<GameConfig[]>({
    url: "/game/config/list",
    token: user?.token,
  });
}

export async function editGameConfig(list: GameConfig[]) {
  const user = await getSession();
  return await apiRequest({
    url: "/game/config/update",
    method: "POST",
    data: { list },
    token: user?.token,
  });
}

export async function getGameOdds({ gameId }: { gameId: number }) {
  const user = await getSession();
  return await apiRequest<GameOdds[]>({
    url: "/game/oddsLimit/list",
    token: user?.token,
    params: { gameId },
  });
}
