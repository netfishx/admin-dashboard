"use server";

import { apiRequest } from "@/lib/request";
import type {
  AgentData,
  Announcement,
  AnnouncementAgentListRequest,
  AnnouncementList,
  AnnouncementListRequest,
  ApplyData,
  ApplyListRequest,
  ChangeLog,
  GameConfig,
  GameOdds,
  GameType,
  LoginLog,
  MaintainGame,
  MemberList,
  PageData,
  PeriodReport,
  PeriodReportList,
  RatioReportListTypes,
  SupplierConfig,
  SupplierReportListItem,
  UserBasicInfo,
  WithPagination,
  WithdrawFormData,
} from "@/lib/types";

import { getSession } from "@/session";

export async function getGameList(type: number) {
  const user = await getSession();
  return await apiRequest<GameType[]>({
    url: "/game/list",
    params: { type },
    token: user?.token,
    expire: "max",
  });
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
  return await apiRequest<PageData<AgentData>>({
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
  return await apiRequest<GameConfig[]>({
    url: "/game/config/list",
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
    url: "/game/config/update",
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
  const user = await getSession();
  return await apiRequest<PageData<ChangeLog>>({
    url: "/operateLog/list",
    params,
    token: user?.token,
  });
}

export async function getMemberList(params: {
  pageNum: number;
  pageSize: number;
}) {
  const user = await getSession();
  return await apiRequest<PageData<MemberList>>({
    url: "/member/user/main/getUnderMember",
    params,
    token: user?.token,
  });
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

// 系统管理-公告管理-全平台公告
export async function getAnnouncement(params: AnnouncementListRequest) {
  const user = await getSession();
  return await apiRequest<PageData<AnnouncementList>>({
    url: "/announcement/getPageListByPlatform",
    params,
    token: user?.token,
  });
}
// 系统管理-公告管理-本级公告
export async function getAgentAnnouncement(
  params: AnnouncementAgentListRequest,
) {
  const user = await getSession();
  return await apiRequest<PageData<AnnouncementList>>({
    url: "/announcement/getPageListByUserId",
    params,
    token: user?.token,
  });
}
// 系统管理-公告管理-添加公告/编辑公告
export async function saveAnnouncement(data: Announcement) {
  const user = await getSession();
  return await apiRequest({
    url: "/announcement/sendAnnouncement",
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
  const [res, res2] = await Promise.all([
    getGameList(1),
    apiRequest<SupplierConfig[]>({
      url: "/supplierConf/list",
      token: user?.token,
      params: { userId },
    }),
  ]);
  return {
    ...res2,
    data: res2.data?.map((item) => ({
      ...item,
      gameName: res.data
        ?.find((i) => i.gameType === item.gameType)
        ?.list.find((i) => i.gameId === item.gameId)?.gameIdLabel,
    })),
  };
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
  return await apiRequest<PageData<RatioReportListTypes>>({
    url: "/report/agent/baccarat/memberBet",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getRatioReport(data: any) {
  const user = await getSession();
  return await apiRequest<PageData<RatioReportListTypes>>({
    url: "/report/agent/baccarat/stack",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getPeriodReport(params: PeriodReport) {
  const user = await getSession();
  return await apiRequest<PageData<PeriodReportList>>({
    url: "/getReports",
    params,
    token: user?.token,
  });
}

export async function getGameConfig(userId?: string) {
  const user = await getSession();
  const [res, res2] = await Promise.all([
    getGameList(1),
    apiRequest<GameConfig[]>({
      url: "/game/config/list",
      token: user?.token,
      params: userId ? { userId } : undefined,
    }),
  ]);
  return {
    ...res2,
    data: res2.data?.map((item) => ({
      ...item,
      gameName: res.data
        ?.find((i) => i.gameType === item.gameType)
        ?.list.find((i) => i.gameId === item.gameId)?.gameIdLabel,
    })),
  };
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

// 获取谷歌二维码
export async function getGoogleQrCode() {
  const user = await getSession();
  return await apiRequest<{ secret: string; qrcode: string }>({
    url: "/agent/center/google/qrCode",
    token: user?.token,
  });
}
// 绑定谷歌验证
export async function bindGoogleAuth(data: { code: string; secret: string }) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/center/google/bind",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 解绑谷歌验证 重置
export async function unbindGoogleAuth(data: { secret: string; code: string }) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/center/google/unbind",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 设置资金密码
export async function bindFundPassword(data: {
  secret: string;
  userId: string;
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/center/fund/bind",
    method: "POST",
    data,
    token: user?.token,
  });
}

// 修改资金密码
export async function editFundPassword(data: {
  oldSecret: string;
  newSecret: string;
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/center/fund/edit",
    method: "POST",
    data,
    token: user?.token,
  });
}
export async function syncGameOdds({ gameId }: { gameId: number }) {
  const user = await getSession();
  return await apiRequest({
    url: "/game/oddsLimit/sync",
    method: "POST",
    data: { gameId },
    token: user?.token,
  });
}
export async function restoreGameOdds({ gameId }: { gameId: number }) {
  const user = await getSession();
  return await apiRequest({
    url: "/game/oddsLimit/restore",
    method: "POST",
    data: { gameId },
    token: user?.token,
  });
}
export async function updateGameOdds(data: {
  gameId: number;
  list: GameOdds[];
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/game/oddsLimit/update",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getUserBasicInfo() {
  const user = await getSession();
  return await apiRequest<UserBasicInfo>({
    url: "/agent/center/base/info",
    token: user?.token,
  });
}

export async function postUserInfoWithdraw(data: WithdrawFormData) {
  const user = await getSession();
  return await apiRequest({
    url: "/order/withdraw/agent/apply",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 提款申请
export async function getWithdrawApplyList(params: ApplyListRequest) {
  const user = await getSession();
  return await apiRequest<WithPagination & { list: ApplyData[] }>({
    url: "/order/withdraw/page",
    params,
    token: user?.token,
  });
}
// 提款申请-锁定
export async function lockApply(data: { id: string }) {
  const user = await getSession();
  return await apiRequest({
    url: "/order/withdraw/locked",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 通过 拒绝
export async function auditWithdrawRecord(data: {
  id: string;
  approverStatusEnum: number;
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/order/withdraw/audit",
    method: "POST",
    data,
    token: user?.token,
  });
}
// 再次发起
export async function againApply(data: { id: string }) {
  const user = await getSession();
  return await apiRequest({
    url: "/order/withdraw/retry",
    method: "POST",
    data,
    token: user?.token,
  });
}

export async function getSupplierReportList() {
  const user = await getSession();
  return await apiRequest<PageData<SupplierReportListItem>>({
    url: "/report/agent/baccarat/supply",
    token: user?.token,
  });
}
