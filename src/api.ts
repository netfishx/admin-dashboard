"use server";

import { apiRequest } from "@/lib/request";
import type {
  AgentData,
  Announcement,
  AnnouncementList,
  AnnouncementListRequest,
  ApplyData,
  ApplyListRequest,
  AuditList,
  AuditListRequest,
  BackgroundImageList,
  BombDetailRecords,
  BorrowRecordRequestParams,
  BorrowRecordRequestRecords,
  ChangeLog,
  CollectionAddressListRecords,
  CreditRecordRequestParams,
  CreditRecordRequestRecords,
  DictionaryItem,
  DictionaryList,
  DownloadListRecords,
  FundList,
  GameConfig,
  GameInfo,
  GameOdds,
  GameRecordRequestParams,
  GameRecordRequestRecords,
  GameType,
  LoginLog,
  MaintainGame,
  MemberBetReportRequestParams,
  MemberBetReportRequestRecords,
  MemberChartList,
  MemberList,
  MemberReportRequestParams,
  MemberReportsRecord,
  MySelfLoginLog,
  OrderItemDetailType,
  OrderReportsRecord,
  OrderReportsRequestParams,
  OreFeeList,
  PageData,
  PeriodReportList,
  PeriodReportParams,
  Permission,
  PokerReportRequestParams,
  PokerReportRequestRecords,
  RatioReportRequestParams,
  RatioReportRequestRecords,
  RechargeReport,
  RechargeReportParams,
  RewardRecordRequestParams,
  RewardRecordRequestRecords,
  Role,
  SameOrSeniorAnnoListRequest,
  Subaccount,
  Supplier,
  SupplierConfig,
  SupplierReportRecords,
  SupplierReportRequestParams,
  TodayFundList,
  TodayGameReport,
  TodayWinLoss,
  TransferRecordRequestParams,
  TransferRecordRequestRecords,
  UserBasicInfo,
  WalletLogRecords,
  WalletLogRequestParams,
  WithdrawApply,
  WithdrawFee,
  WithdrawFormData,
  WithdrawReport,
  WithdrawReportParams,
} from "@/lib/types";
import { cookies } from "next/headers";

import { getToken } from "@/session";
import axios from "axios";

export async function signOut() {
  (await cookies()).delete("session");
}

export async function getGameList(type: number) {
  const token = await getToken();
  return await apiRequest<GameType[]>({
    url: "/game/list",
    params: { type },
    token,
    expire: "minutes",
  });
}

export async function login({
  username,
  password,
  code,
  captcha,
}: {
  username: string;
  password: string;
  code: string;
  captcha: string;
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
      permissions: string[];
    };
    accessToken: string;
  }>({
    url: "/agent/login",
    method: "POST",
    data: {
      username,
      password,
      code,
      captcha,
    },
    header: {
      Authorization: "Basic f56e2910e849dc73a3588e5a4605a0eb",
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
          permissions: res.data.userDetail.permissions,
        }
      : null,
  };
}
export async function logout() {
  const token = await getToken();
  return await apiRequest({
    url: "/security/logout",
    method: "POST",
    token,
  });
}

// 用户管理-代理管理-获取代理列表
export async function getAgents(params: { pageNum: number; pageSize: number }) {
  const token = await getToken();
  return await apiRequest<PageData<AgentData>>({
    url: "/agent/user/main/getUnderAgent",
    params,
    token,
  });
}
// 用户管理-代理管理-获取单个代理信息
export async function getAgentInfoById(params: { id: string }) {
  const token = await getToken();
  return await apiRequest<AgentData>({
    url: "/agent/user/main/getById",
    params,
    token,
  });
}
// 用户管理-代理管理-获取单个代理信息
export async function getAgentInfoByUsername(params: { username: string }) {
  const token = await getToken();
  return await apiRequest<AgentData>({
    url: "/agent/user/main/getByusername",
    params,
    token,
  });
}
export async function updateAgent(data: {
  id: string;
  username?: string;
  nickname?: string;
  status?: number;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/user/main/update",
    method: "POST",
    data,
    token,
  });
}

// 用户管理-代理管理-转账
export async function transferMoney(data: {
  userId: string;
  amount: number;
  secret: string;
}) {
  const token = await getToken();
  return await apiRequest<{ check: boolean; id: string }>({
    url: "/wallet/transfer",
    method: "POST",
    data,
    token,
  });
}

// 用户管理-会员管理-销账
export async function deleteDebt(data: {
  memberId: string;
  money: number;
  secret: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/order/repayment/pay",
    method: "POST",
    data,
    token,
  });
}

// 用户管理-谷歌验证
export async function googleValidata(data: { id: string; code: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/wallet/google/check",
    method: "POST",
    data,
    token,
  });
}

// 用户管理-代理管理-重置代理返水次数
export async function resetRestCount(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/user/main/cleanLoginError",
    method: "POST",
    data,
    token,
  });
}
// 用户管理-代理管理-添加代理
export async function addAgent(data: {
  username: string;
  nickname: string;
  password: string;
}) {
  const token = await getToken();
  return await apiRequest({
    token,
    url: "/agent/user/main/createAccount",
    method: "POST",
    data,
  });
}

// 用户管理-代理管理-获取代理游戏设置
export async function getAgentConfig(params: { userId: string }) {
  const token = await getToken();
  return await apiRequest<GameConfig[]>({
    url: "/game/config/list",
    params,
    token,
  });
}
// 用户管理-代理管理-更新代理游戏设置
export async function updateAgentGameConfig(data: {
  userId: string;
  list: GameConfig[];
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/game/config/update",
    method: "POST",
    data,
    token,
  });
}
// 用户管理-代理管理-获取代理变更日志
export async function getChangeLog(params: {
  targetUserId: string;
  appType: string;
  pageNum?: number;
  pageSize?: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<ChangeLog>>({
    url: "/operateLog/list",
    params,
    token,
    expire: 3,
  });
}

export async function getMemberList(params: {
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<MemberList>>({
    url: "/member/user/main/getUnderMember",
    params,
    token,
  });
}
export async function updateMember(data: {
  id: string;
  status: number;
  agentId?: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/member/user/main/update",
    method: "POST",
    data,
    token,
  });
}

// 用户管理-会员管理-收息
export async function modifyCreditLimit(data: {
  userId: string;
  amount: number;
  secret: string;
}) {
  const token = await getToken();
  return await apiRequest<{ check: boolean; id: string }>({
    url: "/wallet/modifyCreditLimit",
    method: "POST",
    data,
    token,
  });
}

export async function getAgentLoginLog(params: {
  userId: string;
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<LoginLog>>({
    url: "/agent/loginLog/listPage",
    params,
    token,
    expire: 3,
  });
}

// 用户管理-代理管理-获取自己登录日志
export async function getMySelfLoginLog(params: {
  pageNum: number;
  pageSize: number;
  startTime?: number;
  endTime?: number;
  ip?: string;
}) {
  const token = await getToken();
  return await apiRequest<PageData<MySelfLoginLog>>({
    url: "/agent/loginLog/listPageSelf",
    params,
    token,
  });
}

export async function getMemberLoginLog(params: {
  memberId: string;
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<LoginLog>>({
    url: "/member/loginLog/listPage",
    params,
    token,
    expire: 3,
  });
}

export async function getSupplierList(params?: {
  id?: string;
  username?: string;
}) {
  const token = await getToken();
  return await apiRequest<Supplier[]>({
    url: "/vendor/user/getVendorList",
    params,
    token,
  });
}

export async function addSupplier(data: {
  username: string;
  nickname: string;
  newPassword: string;
  remark: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/vendor/user/createAccount",
    method: "POST",
    data,
    token,
  });
}

export async function editSupplier(data: {
  id: string;
  nickname: string;
  remark: string;
  newPassword?: string;
  status: number;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/vendor/user/update",
    method: "POST",
    data,
    token,
  });
}

export async function cleanSupplierLoginError(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/vendor/user/cleanLoginError",
    method: "POST",
    data,
    token,
  });
}

// 系统管理-公告管理-全平台公告
export async function getAnnouncement(params: AnnouncementListRequest) {
  const token = await getToken();
  const res = await apiRequest<PageData<AnnouncementList>>({
    url: "/announcement/getPageListByPlatform",
    params,
    token,
  });
  if (res.data?.list) {
    res.data.list = res.data.list.map((item) => ({
      ...item,
      contentOfLanguage: item.content.content,
      labelOfLanguage: item.content.label,
    }));
  }
  return res;
}
// 系统管理-公告管理-本级公告（上级公告）
export async function getSameOrSeniorAnno(params: SameOrSeniorAnnoListRequest) {
  const token = await getToken();
  const res = await apiRequest<PageData<AnnouncementList>>({
    url: "/announcement/getPageListByUserId",
    params,
    token,
  });
  if (res.data?.list) {
    res.data.list = res.data.list.map((item) => ({
      ...item,
      contentOfLanguage: item.content.content,
      labelOfLanguage: item.content.label,
    }));
  }
  return res;
}
// 系统管理-公告管理-添加公告/编辑公告
export async function saveAnnouncement(data: Announcement) {
  const token = await getToken();
  return await apiRequest({
    url: "/announcement/sendAnnouncement",
    method: "POST",
    data,
    token,
  });
}

export async function getReceiveOrder() {
  const token = await getToken();
  return await apiRequest<{ receiveStatus: boolean }>({
    url: "/agent/user/main/receiveOrder",
    token,
  });
}

export async function editReceiveOrder({ status }: { status: boolean }) {
  const token = await getToken();
  return await apiRequest<{ status: boolean }>({
    url: "/agent/user/main/receiveOrder",
    method: "POST",
    data: { receiveStatus: status ? 1 : 0 },
    token,
  });
}

export async function getSupplierConfigs(userId?: string) {
  const token = await getToken();
  const [res, res2] = await Promise.all([
    getBaccaratGames(),
    apiRequest<SupplierConfig[]>({
      url: "/supplierConf/list",
      token,
      params: userId ? { userId } : undefined,
    }),
  ]);

  return {
    ...res2,
    data: res2.data?.map((item) => ({
      ...item,
      gameName: res.data?.find((i) => i.gameId === item.gameId)?.gameName,
    })),
  };
}

export async function editSupplierConfig(data: SupplierConfig) {
  const token = await getToken();
  return await apiRequest({
    url: "/supplierConf/save",
    method: "POST",
    data,
    token,
  });
}

export async function getMaintainList() {
  const token = await getToken();
  const [res, res2] = await Promise.all([
    getBaccaratGames(),
    apiRequest<MaintainGame[]>({
      url: "/gameSwitch/list",
      token,
    }),
  ]);

  return {
    ...res2,
    data: res2.data?.map((item) => ({
      ...item,
      gameName: res.data?.find((i) => i.gameId === item.gameId)?.gameName,
    })),
  };
}

export async function editMaintain(data: { status: number; ids: string[] }) {
  const token = await getToken();
  return await apiRequest({
    url: "/gameSwitch/update",
    method: "POST",
    data,
    token,
  });
}

// 代理报表-会员下注报表
export async function getMemberBetReport(params: MemberBetReportRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<MemberBetReportRequestRecords>>({
    url: "/report/agent/baccarat/memberBet",
    params,
    token,
  });
}

// 代理报表-拦货占成
export async function getRatioReport(params: RatioReportRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<RatioReportRequestRecords>>({
    url: "/report/agent/baccarat/stack",
    params,
    token,
  });
}

// 按期汇总报表
export async function getPeriodReport(params: PeriodReportParams) {
  const token = await getToken();
  const [res, res2] = await Promise.all([
    getGameList(1),
    apiRequest<PageData<PeriodReportList>>({
      url: "/report/agent/baccarat/issue",
      params,
      token,
    }),
  ]);
  return {
    ...res2,
    data: {
      ...res2.data,
      list: res2.data?.list.map((item) => ({
        ...item,
        gameName: res.data
          ?.find((i) => i.gameType === item.gameType)
          ?.list.find((i) => i.gameId === item.gameId)?.gameIdLabel,
        gameTypeName: res.data?.find((i) => i.gameType === item.gameType)
          ?.gameTypeLabel,
      })),
      gameList: res.data,
    },
  };
}

export async function getBaccaratGameConfig(userId?: string) {
  const result = await getGameConfig(userId);
  return {
    ...result,
    data: result.data?.filter((item) => item.gameType === 61),
  };
}

export async function getGameConfig(userId?: string) {
  const token = await getToken();
  const [res, res2] = await Promise.all([
    getAllGames(),
    apiRequest<GameConfig[]>({
      url: "/game/config/list",
      token,
      params: userId ? { userId } : undefined,
    }),
  ]);
  return {
    ...res2,
    data: res2.data?.map((item) => ({
      ...item,
      gameName: res.data?.find(
        (i) => i.gameType === item.gameType && i.gameId === item.gameId,
      )?.gameName,
    })),
  };
}

export async function getDefaultGameConfig() {
  const token = await getToken();
  const [res, res2] = await Promise.all([
    getGameList(1),
    apiRequest<GameConfig[]>({
      url: "/game/default/listConfig",
      token,
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
  const token = await getToken();
  return await apiRequest({
    url: "/game/config/update",
    method: "POST",
    data: { list },
    token,
  });
}

export async function editDefaultGameConfig(list: GameConfig[]) {
  const token = await getToken();
  return await apiRequest({
    url: "/game/default/updateConfig",
    method: "POST",
    data: { list },
    token,
  });
}

export async function getGameOdds({
  gameId,
  userId,
}: {
  gameId: number;
  userId?: string;
}) {
  const token = await getToken();
  return await apiRequest<GameOdds[]>({
    url: "/game/oddsLimit/list",
    token,
    params: { gameId, userId },
    expire: 3,
  });
}

// 获取列表
export async function getSecurityList() {
  const token = await getToken();
  return await apiRequest<{ type: number; isOpen: boolean }[]>({
    url: "/agent/center/list",
    token,
  });
}
// 获取谷歌二维码
export async function getGoogleQrCode() {
  const token = await getToken();
  return await apiRequest<{ secret: string; qrcode: string }>({
    url: "/agent/center/google/qrCode",
    token,
  });
}
// 绑定谷歌验证
export async function bindGoogleAuth(data: { code: string; secret: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/center/google/bind",
    method: "POST",
    data,
    token,
  });
}
// 解绑谷歌验证 重置
export async function unbindGoogleAuth(data: { secret: string; code: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/center/google/unbind",
    method: "POST",
    data,
    token,
  });
}
// 设置资金密码
export async function bindFundPassword(data: { secret: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/center/fund/bind",
    method: "POST",
    data: { secret: data.secret },
    token,
  });
}

// 修改资金密码
export async function editFundPassword(data: {
  oldSecret: string;
  newSecret: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/center/fund/edit",
    method: "POST",
    data,
    token,
  });
}
export async function syncGameOdds({ gameId }: { gameId: number }) {
  const token = await getToken();
  return await apiRequest({
    url: "/game/oddsLimit/sync",
    method: "POST",
    data: { gameId },
    token,
  });
}
export async function restoreGameOdds({ gameId }: { gameId: number }) {
  const token = await getToken();
  return await apiRequest({
    url: "/game/oddsLimit/restore",
    method: "POST",
    data: { gameId },
    token,
  });
}
export async function updateGameOdds(data: {
  gameId: number;
  list: GameOdds[];
  userId?: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/game/oddsLimit/update",
    method: "POST",
    data,
    token,
  });
}

export async function getUserBasicInfo() {
  const token = await getToken();
  return await apiRequest<UserBasicInfo>({
    url: "/agent/center/base/info",
    token,
  });
}

export async function postUserInfoWithdraw(data: WithdrawFormData) {
  const token = await getToken();
  return await apiRequest<WithdrawApply>({
    url: "/order/withdraw/agent/apply",
    method: "POST",
    data,
    token,
  });
}
// 提款申请
export async function getWithdrawApplyList(data: ApplyListRequest) {
  const token = await getToken();
  return await apiRequest<PageData<ApplyData>>({
    url: "/order/withdraw/page",
    method: "POST",
    data,
    token,
  });
}
// 提款申请-锁定
export async function lockApply(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/order/withdraw/locked",
    method: "POST",
    data,
    token,
  });
}
// 通过 拒绝
export async function auditWithdrawRecord(data: {
  id: string;
  approverStatusEnum: number;
  modeEnum?: number;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/order/withdraw/audit",
    method: "POST",
    data,
    token,
  });
}
// 再次发起
export async function againApply(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/order/withdraw/retry",
    method: "POST",
    data,
    token,
  });
}

// 确认到账
export async function ackWithdrawAccount(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/order/withdraw/ack/account",
    method: "POST",
    data,
    token,
  });
}
// 稽核管理-稽核列表
export async function getAuditList(params: AuditListRequest) {
  const token = await getToken();
  return await apiRequest<PageData<AuditList>>({
    url: "/agent/audit/page",
    params,
    token,
  });
}
// 清除稽核
export async function clearAudit(data: { id: string; userId: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/audit/cleanAudit",
    method: "POST",
    data,
    token,
  });
}

// 供应商报表
export async function getSupplierReportList(
  params: SupplierReportRequestParams,
) {
  const token = await getToken();
  return await apiRequest<PageData<SupplierReportRecords>>({
    url: "/report/agent/baccarat/supply",
    token,
    params,
  });
}

export async function getMemberReportList(params: MemberReportRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<MemberReportsRecord>>({
    url: "/report/agent/baccarat/member",
    token,
    params,
  });
}

// 注单列表-棋牌
export async function getOrderReportList(params: OrderReportsRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<OrderReportsRecord>>({
    url: "/agent/order/baccarat/list",
    token,
    params,
  });
}

// 注单列表-掼蛋
export async function getGuandanReportList(params: GameRecordRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<GameRecordRequestRecords>>({
    url: "/agent/order/guandan/list",
    token,
    params,
  });
}

// 注单列表-掼蛋-详情
export async function getGuandanReportListDetail(
  params: GameRecordRequestParams,
) {
  const token = await getToken();
  return await apiRequest<PageData<BombDetailRecords>>({
    url: "/agent/order/guandan/detail",
    token,
    params,
  });
}

// 代理报表-棋牌
export async function getPokerReport(params: PokerReportRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<PokerReportRequestRecords>>({
    url: "/report/agent/poker",
    token,
    params,
  });
}

// 充值报表
export async function getRechargeReportList(data: RechargeReportParams) {
  const token = await getToken();
  return await apiRequest<PageData<RechargeReport>>({
    url: "/order/recharge/report",
    method: "POST",
    token,
    data,
  });
}
// 提现报表
export async function getWithdrawReportList(data: WithdrawReportParams) {
  const token = await getToken();
  const res = await apiRequest<PageData<WithdrawReport>>({
    url: "/order/withdraw/report",
    method: "POST",
    token,
    data,
  });
  if (res.data?.list) {
    // 审核状态(approverStatus)：0未处理，1锁定中，2已拒绝，3已通过
    // 资金状态(moneyStatus)：0转账中，1已到账，2出款失败；
    // status： 未处理 锁定中 > 审核中（0）；已通过并异常 > 提现中（1）； 已拒绝 > 审核拒绝（2）；已到账 > 提现成功（3）
    const getStatus = ({
      approverStatus,
      moneyStatus,
    }: {
      approverStatus: number;
      moneyStatus: number;
    }) => {
      // 审核中
      if (approverStatus === 0 || approverStatus === 1) {
        return 0;
      }
      // 提现中 (已通过并出款失败)
      if (approverStatus === 3 && moneyStatus === 2) {
        return 1;
      }
      // 审核拒绝
      if (approverStatus === 2) {
        return 2;
      }
      // 提现成功 (已到账)
      if (moneyStatus === 1) {
        return 3;
      }

      return 1; // 默认提现中
    };

    res.data.list = res.data.list.map((item: WithdrawReport) => ({
      ...item,
      status: getStatus({
        approverStatus: item.approverStatus,
        moneyStatus: item.moneyStatus,
      }),
    }));
  }
  return res;
}

// 归集地址列表
export async function getCollectionAddressList(params: { size: number }) {
  const token = await getToken();
  return await apiRequest<CollectionAddressListRecords[]>({
    url: "/collection/address/list",
    token,
    params,
  });
}

export async function getRoleList({
  pageNum = 1,
  pageSize = 10,
}: {
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<Role>>({
    url: "/role/pageList",
    token,
    params: { pageNum, pageSize },
  });
}

export async function getPermissionList() {
  const token = await getToken();
  return await apiRequest<Permission[]>({
    url: "/perms/listAllOwner",
    token,
  });
}

export async function editRole(data: Role) {
  const token = await getToken();
  return await apiRequest({
    url: "/role/saveOrUpdate",
    method: "POST",
    data,
    token,
  });
}

export async function deleteRole(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/role/deleteById",
    method: "DELETE",
    data,
    token,
  });
}

// 新增归集地址
export async function addCollectionAddress(data: { size: number }) {
  const token = await getToken();
  return await apiRequest({
    url: "/collection/address/add",
    method: "POST",
    data,
    token,
  });
}

// 锁定归集地址
export async function lockCollectionAddress(data: {
  address: string;
  status: number;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/collection/address/enable",
    method: "POST",
    data,
    token,
  });
}

// 注单详情
export async function getOrderDetail(params: { id: string }) {
  const token = await getToken();
  return await apiRequest<OrderItemDetailType>({
    url: "/agent/order/baccarat/detail",
    token,
    params,
  });
}
// 矿工费
export async function getOreFeeList() {
  const token = await getToken();
  return await apiRequest<OreFeeList[]>({
    url: "/orefee/address/list",
    token,
  });
}
// 添加矿工费
export async function addOreFee(data: { size: number }) {
  const token = await getToken();
  return await apiRequest({
    url: "/orefee/address/add",
    method: "POST",
    params: data,
    token,
  });
}
// 移除矿工费
export async function removeOreFee(data: { address: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/orefee/address/remove",
    method: "POST",
    params: data,
    token,
  });
}

// 字典列表
export async function getDictionaryList(params: {
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<DictionaryList>>({
    url: "/dict/pageList",
    token,
    params,
  });
}
// 添加字典
export async function addDictionary(data: {
  dictName: string;
  dictCode: string;
  remark: string;
}) {
  const token = await getToken();
  return await apiRequest<{ code: number; message: string }>({
    url: "/dict/save",
    method: "POST",
    data,
    token,
  });
}

// 编辑字典
export async function editDictionary(data: {
  id: string;
  dictName: string;
  dictCode: string;
  remark: string;
}) {
  const token = await getToken();
  return await apiRequest<{ code: number; message: string }>({
    url: "/dict/update",
    method: "PUT",
    data,
    token,
  });
}

// 删除字典
export async function deleteDictionary(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/dict/deleteById",
    method: "DELETE",
    data,
    token,
  });
}

// 字典项列表
export async function getDictionaryItemList(params: { dictCode: string }) {
  const token = await getToken();
  return await apiRequest<{ [key: string]: DictionaryItem[] }>({
    url: "/dict/item/selectList",
    token,
    params,
  });
}

// 添加字典项
export async function addDictionaryItem(data: {
  dictCode: string;
  label: string;
  value: string;
  remark: string;
  i18nType: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/dict/item/save",
    method: "POST",
    data,
    token,
  });
}

// 编辑字典项
export async function editDictionaryItem(data: {
  id: string;
  dictCode: string;
  label: string;
  value: string;
  remark: string;
  i18nType: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/dict/item/update",
    method: "PUT",
    data,
    token,
  });
}

// 删除字典项
export async function deleteDictionaryItem(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/dict/item/deleteById",
    method: "DELETE",
    data,
    token,
  });
}

// 背景图列表
export async function getBackgroundImageList(params: {
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<BackgroundImageList>>({
    url: "/backgroundPicture/getPage",
    token,
    params,
  });
}
// 背景图添加或修改
export async function addBackgroundImage(data: {
  id?: string;
  pictureUri: string;
  pictureName: string;
  port: string;
  position: string;
  language: string;
  status: number;
  sort: number;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/backgroundPicture/addOrModify",
    method: "POST",
    data,
    token,
  });
}
// 删除背景图
export async function deleteBackgroundImage(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/backgroundPicture/delete",
    method: "DELETE",
    data,
    token,
  });
}

// 授信记录list
export async function postGetCreditLogList(data: CreditRecordRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<CreditRecordRequestRecords>>({
    url: "/wallet/getCreditLogList",
    method: "POST",
    data,
    token,
  });
}

// 借还记录list
export async function postGetBorrowLogList(data: BorrowRecordRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<BorrowRecordRequestRecords>>({
    url: "/order/credit/report",
    method: "POST",
    data,
    token,
  });
}

// 获取最新一条提现手续费 1223:update
export async function getNewestWithdrawFee() {
  const token = await getToken();
  return await apiRequest<WithdrawFee>({
    url: "/config/withdraw/fee/agent/newest",
    token,
  });
}

// 编辑提现手续费
export async function saveWithdrawFee(data: WithdrawFee) {
  const token = await getToken();
  return await apiRequest({
    url: "/config/withdraw/fee/edit",
    method: "POST",
    data,
    token,
  });
}
// 首页 今日盈亏
export async function getTodayWinLoss(params: {
  startTime: number;
  endTime: number;
}) {
  const token = await getToken();
  return await apiRequest<TodayWinLoss>({
    url: "/index/todayWinLoss",
    token,
    params,
  });
}
// 首页 图表 饼图+百家乐掼蛋数据趋势
export async function getTodayWinLossChart(params: {
  startTime: number;
  endTime: number;
  beforeEndTime: number;
  size: number;
}) {
  const token = await getToken();
  const [res, res2] = await Promise.all([
    getGameList(1),
    apiRequest<TodayGameReport>({
      url: "/index/todayGameReport",
      token,
      params,
    }),
  ]);
  // 格式化 agentBaccaratIssueReport 的 gameName
  const formattedAgentBaccaratAmountReport =
    res2.data?.agentBaccaratAmountReport.map((report) => ({
      ...report,
      gameName:
        res.data
          ?.find((i) => i.gameType === report.gameType)
          ?.list.find((i) => i.gameId === report.gameId)?.gameIdLabel ?? "其他",
    }));
  const formattedAgentBaccaratBetNumReport =
    res2.data?.agentBaccaratBetNumReport.map((report) => ({
      ...report,
      gameName:
        res.data
          ?.find((i) => i.gameType === report.gameType)
          ?.list.find((i) => i.gameId === report.gameId)?.gameIdLabel ?? "其他",
    }));
  return {
    ...res2,
    data: {
      ...res2.data,
      agentBaccaratAmountReport: formattedAgentBaccaratAmountReport,
      agentBaccaratBetNumReport: formattedAgentBaccaratBetNumReport,
    },
  };
}
export async function getFundList(params: {
  startTime: number;
  endTime: number;
}) {
  const token = await getToken();
  return await apiRequest<FundList>({
    url: "/index/fundList",
    token,
    params,
  });
}
export async function getMemberChartList(params: {
  startTime: number;
  endTime: number;
}) {
  const token = await getToken();
  return await apiRequest<MemberChartList>({
    url: "/index/todayLogReport",
    token,
    params,
  });
}

// 转账记录list
export async function postGetTransferLogList(
  data: TransferRecordRequestParams,
) {
  const token = await getToken();
  return await apiRequest<PageData<TransferRecordRequestRecords>>({
    url: "/wallet/getTransferLog",
    method: "POST",
    data,
    token,
  });
}

export async function getSubaccountList({
  pageNum = 1,
  pageSize = 10,
}: {
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<Subaccount>>({
    url: "/agent/user/sub/getUnderAgent",
    token,
    params: { pageNum, pageSize },
  });
}

export async function updateSubaccount(data: Subaccount) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/user/sub/account",
    method: "POST",
    data,
    token,
  });
}

export async function deleteSubaccount(data: { id: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/user/sub/delete",
    method: "DELETE",
    data,
    token,
  });
}

// 首页今日平台金流
export async function getTodayFundList({
  startTime,
  endTime,
}: {
  startTime: number;
  endTime: number;
}) {
  const token = await getToken();
  return await apiRequest<TodayFundList>({
    url: "/index/todayFund",
    token,
    params: { startTime, endTime },
  });
}

// 帐变记录
export async function getWalletLog(data: WalletLogRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<WalletLogRecords>>({
    url: "/wallet/getWalletLog",
    method: "POST",
    data,
    token,
  });
}

// 打赏记录list
export async function postGetRewardRecordList(data: RewardRecordRequestParams) {
  const token = await getToken();
  return await apiRequest<PageData<RewardRecordRequestRecords>>({
    url: "/wallet/getTipList",
    method: "POST",
    data,
    token,
  });
}

// 验证资金密码
export async function postCheckMoneySecret(data: { secret: string }) {
  const token = await getToken();
  return await apiRequest({
    url: "/agent/center/fund/check",
    method: "POST",
    data,
    token,
  });
}
// 修改登录密码
export async function updateSelfPassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  const token = await getToken();
  const params = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  };
  return await apiRequest({
    url: "/agent/account/updateSelfPassword",
    method: "PUT",
    params,
    token,
  });
}
// 设置cookie
export async function setIsFirstLogin() {
  const cookie = await cookies();
  cookie.set("isFirstLogin", "false");
}

export async function uploadImage(data: FormData) {
  const token = await getToken();
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      "Accept-Language": "zh-CN",
    },
    maxBodyLength: 5 * 1024 * 1024,
  });
  console.group("uploadImage");
  console.dir(res.data, { depth: null });
  console.groupEnd();
  return res.data as {
    code: number;
    data: string;
    message: string;
  };
}

export async function getDownloadList(params: {
  pageNum: number;
  pageSize: number;
}) {
  const token = await getToken();
  return await apiRequest<PageData<DownloadListRecords>>({
    url: "/exportHistory",
    token,
    params,
  });
}

export async function getDownloadUrl(params: { id: string }) {
  const token = await getToken();
  return await apiRequest<{ url: string }>({
    url: "/getExportFileUrl",
    params,
    token,
  });
}

export async function getAllGames() {
  const token = await getToken();
  return await apiRequest<GameInfo[]>({
    url: "/game/allGame/list",
    token,
    expire: "minutes",
  });
}

export async function getBaccaratGames() {
  return await getAllGames().then((res) => ({
    ...res,
    data: res?.data?.filter((i) => i.gameType === 61),
  }));
}

export async function getGuandanGames() {
  return await getAllGames().then((res) => ({
    ...res,
    data: res?.data?.filter((i) => i.gameType === 20),
  }));
}

export async function postUserInfoWithdrawVerify(data: {
  id: string;
  code: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/order/withdraw/google/check",
    method: "POST",
    data,
    token,
  });
}

// 生成下载任务
export async function exportClick(data: {
  exportButtonCode: number;
  queryParams: string;
}) {
  const token = await getToken();
  return await apiRequest({
    url: "/exportClick",
    method: "POST",
    data,
    token,
  });
}

// 字典项列表缓存
export async function getDictListCache(data: { dictCode: string }) {
  const token = await getToken();
  return await apiRequest<{ label: string; value: string }[]>({
    url: "/dict/item/selectListCache",
    token,
    params: data,
  });
}
