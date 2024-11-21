export const urlPermissions: {
  [key: string]: string;
} = {
  "/": "agent_stat",
  "/reports/supplier": "supplier_report",
  "/games/flyorder": "fly_config",
  "/games/odds": "edit_odds",
  "/games/ratio": "edit_radio",
  "/games/rebate": "edit_rebate",
  "/games/supplier": "supplier_config",
  "/games/maintain": "game_maintain",
  "/system/subaccount": "sub_account",
  "/system/role": "system_role",
  "/system/announcement/all": "own_announcement",
  "/maintain/dictionary": "dictionary",
  "/maintain/resource": "resource_config",
};
