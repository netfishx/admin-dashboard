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
  AuditList,
  AuditListRequest,
  ChangeLog,
  CollectionAddressListRecords,
  CollectionAddressListRequestParams,
  GameConfig,
  GameOdds,
  GameType,
  LoginLog,
  MaintainGame,
  MemberBetReportRequestParams,
  MemberBetReportRequestRecords,
  MemberList,
  MemberReportRequestParams,
  MemberReportsRecord,
  OrderReportsRecord,
  OrderReportsRequestParams,
  PageData,
  PeriodReport,
  PeriodReportList,
  PokerReportRequestParams,
  PokerReportRequestRecords,
  RatioReportRequestParams,
  RatioReportRequestRecords,
  RechargeReport,
  RechargeReportParams,
  SupplierConfig,
  SupplierReportRecords,
  SupplierReportRequestParams,
  UserBasicInfo,
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

export async function getAgentLoginLog(params: {
  agentId: string;
  pageNum?: number;
  pageSize?: number;
}) {
  const user = await getSession();
  return await apiRequest<PageData<LoginLog>>({
    url: "/agent/loginLog/get",
    params,
    token: user?.token,
  });
}

export async function getMemberLoginLog(params: {
  memberId: string;
  pageNum?: number;
  pageSize?: number;
}) {
  const user = await getSession();
  return await apiRequest<PageData<LoginLog>>({
    url: "/agent/loginLog/get",
    params,
    token: user?.token,
  });
}

export async function agentBaccaratReport(data: any) {
  return await apiRequest({ url: "/api/agentBaccaratReport", data });
}

// 系统管理-公告管理-全平台公告
export async function getAnnouncement(params: AnnouncementListRequest) {
  const user = await getSession();
  const res = await apiRequest<PageData<AnnouncementList>>({
    url: "/announcement/getPageListByPlatform",
    params,
    token: user?.token,
  });
  if (res.data?.list) {
    res.data.list = res.data.list.map((item) => ({
      ...item,
      contentOfLanguage:
        item.content.find((i) => i.language === "cn")?.content || "",
    }));
  }
  return res;
}
// 系统管理-公告管理-本级公告
export async function getAgentAnnouncement(
  params: AnnouncementAgentListRequest,
) {
  const user = await getSession();
  const res = await apiRequest<PageData<AnnouncementList>>({
    url: "/announcement/getPageListByUserId",
    params,
    token: user?.token,
  });
  if (res.data?.list) {
    res.data.list = res.data.list.map((item) => ({
      ...item,
      contentOfLanguage:
        item.content.find((i) => i.language === "cn")?.content || "",
    }));
  }
  return res;
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

// 代理报表-会员下注报表
export async function getMemberBetReport(params: MemberBetReportRequestParams) {
  const user = await getSession();
  return await apiRequest<PageData<MemberBetReportRequestRecords>>({
    url: "/report/agent/baccarat/memberBet",
    params,
    token: user?.token,
  });
}

// 代理报表-拦货占成
export async function getRatioReport(params: RatioReportRequestParams) {
  const user = await getSession();
  return await apiRequest<PageData<RatioReportRequestRecords>>({
    url: "/report/agent/baccarat/stack",
    params,
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
export async function getWithdrawApplyList(data: ApplyListRequest) {
  const user = await getSession();
  return await apiRequest<PageData<ApplyData>>({
    url: "/order/withdraw/page",
    method: "POST",
    data,
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

// 稽核管理-稽核列表
export async function getAuditList(params: AuditListRequest) {
  const user = await getSession();
  return await apiRequest<PageData<AuditList>>({
    url: "/agent/audit/page",
    params,
    token: user?.token,
  });
}
// 清除稽核
export async function clearAudit(data: { id: string }) {
  const user = await getSession();
  return await apiRequest({
    url: "/agent/audit/cleanAudit",
    method: "POST",
    data,
    token: user?.token,
  });
}

// 供应商报表
export async function getSupplierReportList(
  params: SupplierReportRequestParams,
) {
  const user = await getSession();
  return await apiRequest<PageData<SupplierReportRecords>>({
    url: "/report/agent/baccarat/supply",
    token: user?.token,
    params,
  });
}

export async function getMemberReportList(params: MemberReportRequestParams) {
  const user = await getSession();
  return await apiRequest<PageData<MemberReportsRecord>>({
    url: "/report/agent/baccarat/member",
    token: user?.token,
    params,
  });
}

export async function getOrderReportList(params: OrderReportsRequestParams) {
  const user = await getSession();
  return await apiRequest<PageData<OrderReportsRecord>>({
    url: "/agent/order/baccarat/list",
    token: user?.token,
    params,
  });
}

// 代理报表-棋牌
export async function getPokerReport(params: PokerReportRequestParams) {
  const user = await getSession();
  return await apiRequest<PageData<PokerReportRequestRecords>>({
    url: "/report/agent/gundan",
    token: user?.token,
    params,
  });
}
// 充值报表
export async function getRechargeReportList(data: RechargeReportParams) {
  const user = await getSession();
  const res = await apiRequest<PageData<RechargeReport>>({
    url: "/order/recharge/report",
    method: "POST",
    token: user?.token,
    data,
  });
  console.info("🌸 ~ res:", res);
  return res;
}

// 归集地址列表
export async function getCollectionAddressList(
  params: CollectionAddressListRequestParams,
) {
  const user = await getSession();
  return await apiRequest<CollectionAddressListRecords[]>({
    url: "/collection/address/list",
    token: user?.token,
    params,
  });
}

// 新增归集地址
export async function addCollectionAddress(data: {
  size: number;
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/collection/address/add",
    method: "POST",
    data,
    token: user?.token,
  });
}

// 锁定归集地址
export async function lockCollectionAddress(data: {
  address: string;
  size: number;
}) {
  const user = await getSession();
  return await apiRequest({
    url: "/collection/address/enable",
    method: "POST",
    data,
    token: user?.token,
  });
}
