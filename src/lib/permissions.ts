export const urlPermissions: {
  permission: string;
  url: string;
}[] = [
  {
    permission: "agent_stat",
    url: "/",
  },
  {
    permission: "fly_config",
    url: "/games/flyorder",
  },
  {
    permission: "game_maintain",
    url: "/games/maintain",
  },
  {
    permission: "agent_config",
    url: "/users/agent",
  },
  {
    permission: "member_config",
    url: "/users/member",
  },
  {
    permission: "users_supplier",
    url: "/users/supplier",
  },
  {
    permission: "detail_baccarat",
    url: "/reports/order/baccarat",
  },
  {
    permission: "detail_guandan",
    url: "/reports/order/guandan",
  },
  {
    permission: "agent_report_guandan",
    url: "/reports/agent/guandan",
  },
  {
    permission: "agent_report_baccarat",
    url: "/reports/agent/baccarat/member",
  },
  {
    permission: "agent_report_baccarat",
    url: "/reports/agent/baccarat/ratio",
  },
  {
    permission: "period_report",
    url: "/reports/period",
  },
  {
    permission: "member_report_baccarat",
    url: "/reports/member/baccarat",
  },
  {
    permission: "change_report",
    url: "/reports/change",
  },
  {
    permission: "recharge_report",
    url: "/reports/recharge",
  },
  {
    permission: "withdraw_report",
    url: "/reports/withdraw",
  },
  {
    permission: "borrow_report",
    url: "/reports/borrow",
  },
  {
    permission: "reward_report",
    url: "/reports/reward",
  },
  {
    permission: "credit_report",
    url: "/reports/credit",
  },
  {
    permission: "transfer_report",
    url: "/reports/transfer",
  },
  {
    permission: "report_download",
    url: "/reports/download",
  },
  {
    permission: "supplier_report",
    url: "/reports/supplier",
  },
  {
    permission: "withdraw_apply",
    url: "/withdraw/apply",
  },
  {
    permission: "audit",
    url: "/withdraw/audit",
  },
  {
    permission: "edit_password",
    url: "/personal/security",
  },
  {
    permission: "money_password",
    url: "/personal/security",
  },
  {
    permission: "personal_info",
    url: "/personal/info",
  },
  {
    permission: "login_log",
    url: "/personal/loginlog",
  },
  {
    permission: "sub_account",
    url: "/system/subaccount",
  },
  {
    permission: "system_role",
    url: "/system/role",
  },
  {
    permission: "own_announcement",
    url: "/system/announcement/own",
  },
  {
    permission: "super_announcement",
    url: "/system/announcement/all",
  },
  {
    permission: "platform_announcement",
    url: "/system/announcement/platform",
  },
  {
    permission: "withdrawfee",
    url: "/fund/withdrawfee",
  },
  {
    permission: "minerfee",
    url: "/fund/minerfee",
  },
  {
    permission: "collection",
    url: "/fund/collection",
  },
  {
    permission: "dictionary",
    url: "/maintain/dictionary",
  },
  {
    permission: "resource_config",
    url: "/maintain/resource",
  },
];

export function getRedirectUrl(permissions: string[]) {
  for (const permission of urlPermissions) {
    if (permissions.includes(permission.permission)) {
      return permission.url;
    }
  }
  return "/login";
}
