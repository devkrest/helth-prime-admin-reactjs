export const baseURL = "https://api.cozmogearz.com/";
export const apiBaseUrl = "https://api.cozmogearz.com/api/";
export const mediaBaseUrl = "https://api.cozmogearz.com/uploads/";

export const URLs = {
  baseURL,
  apiBaseUrl,
  mediaBaseUrl,

  // AUTH
  loginByEmailPassword: "auth/login-admin",
  tokenGenerate: "admin/admin/generate-token",

  // USER
  userGetList: "user/get-list",
  userGetById: "user/get-by-id",
  adminGetById: "admin/admin/get-by-id",
  userCreate: "admin/auth/register",
  userUpdate: "user/update-profile",
  userAllUserList: "user/get-all-user-list",
  userAddUpdateEligibility: "user/add-update-eligibility",
  userCheckEligibility: "user/check-user-eligibility",

  // DEPARTMENT
  departmentGetList: "department/get-list",
  departmentGetById: "department/get-by-id",
  departmentUpdate: "department/update",
  departmentAllList: "department/get-all-list",
  departmentAdd: "department/add",

  // Role
  roleGetList: "role/get-list",
  roleCreate: "role/create",
  roleUpdate: "role/update",

  // Module
  moduleGetList: "module/get-list",
  moduleCreate: "module/create",
  moduleUpdate: "module/update",

  // Agency
  agencyGetList: "agency/get-list",
  agencyCreate: "agency/create",
  agencyUpdate: "agency/update",

  // SOP
  sopList: "sop/get-list-admin",
  sopGetDetailsById: "sop/get-by-id",
  sopUpdate: "sop/update",
  sopGetUserDepartment: "sop/get-user-department",

  // Blog
  blogCreate: "blog/create",
  blogUpdate: "blog/update",
  blogGetList: "blog/get-list",
  blogGetById: "blog/get-by-id",
  blogUploadMedia: "blog/upload-media",

  // Notification
  notificationAdd: "notification/add",

  // Customer
  customerAdd: "customer/add",
  customerAddBluck: "customer/add-bluck",
  customerUpdate: "customer/update",
  customerGetList: "customer/get-list",

  // Customer Service
  // Category
  customerServiceCategoryCreate: "customer-service/category/create",
  customerServiceCategoryUpdate: "customer-service/category/update",
  customerServiceCategoryGetList: "customer-service/category/get-list",
  // Customer
  customerServiceCustomerUpdate: "customer-service/customer/update",
  customerServiceCustomerGetList: "customer-service/customer/get-list",
  // User Lead
  customerServiceAgentGetList: "customer-service/user-lead/get-agent-list",
  customerServiceAgentAnalitics: "customer-service/user-lead/get-analitics",
  customerServiceAgentAddCustomer: "customer-service/user-lead/add",
  customerServiceAgentListLight:
    "customer-service/user-lead/get-agent-list-light",
  customerServiceAgentTotalByAgent:
    "customer-service/user-lead/get-remaining-total-by-agent",
  customerServiceAgentSwapOne:
    "customer-service/user-lead/swap-customer-to-agent-one",
  customerServiceAgentSwap: "customer-service/user-lead/swap-customer-to-agent",
  customerServiceAgentRemainingTotal:
    "customer-service/user-lead/get-remaining-total",

  // Lead-Terriotry
  leadTerritoryAddCustomer: "lead-territory/agent/add",
  leadTerritoryGetAgentList: "lead-territory/agent/get-agent-list",
  leadTerritoryGetAnalytics: "lead-territory/agent/get-analytics",
  leadTerritoryGetState: "lead-territory/agent/get-state-list",
  leadTerritoryGetCarrier: "lead-territory/agent/get-carrier-list",
  leadTerritoryGetRemainingTotal: "lead-territory/agent/get-remaining-total",
  leadTerritoryCustomerAddNotification:
    "lead-territory/agent/customer-add-notification",

  leadTerritoryGetRemainingTotalByAgent:
    "lead-territory/agent/get-remaining-total-by-agent",
  leadTerritoryGetStateByAgent: "lead-territory/agent/get-state-list-by-agent",
  leadTerritoryGetAgentListLight: "lead-territory/agent/get-agent-list-light",
  leadTerritoryGetCarrierByAgent:
    "lead-territory/agent/get-carrier-list-by-agent",
  leadTerritorySwapByAgent: "lead-territory/agent/swap-customer-to-agent",
  leadTerritorySwapByAgentOne:
    "lead-territory/agent/swap-customer-to-agent-one",

  // OEP
  oepAddAorName:"/oep/add-aor-name",
  oepUpdateAorName:"/oep/update-aor-name",
  oepGetListAorName:"/oep/get-aor-name-list",

  oepAddAppointmentName:"/oep/add-appointment-status",
  oepUpdateAppointmentName:"/oep/update-appointment-status",
  oepGetListAppointmentName:"/oep/get-appointment-status-list",

  oepAddLicenseTypeName:"/oep/add-license-type",
  oepUpdateLicenseTypeName:"/oep/update-license-type",
  oepGetListLicenseTypeName:"/oep/get-license-type-list",

  oepGetListEligibilityByUser:"/oep/get-eligibility-by-user-id",
  oepAddEligibility:"/oep/add-user-eligibility",
  oepUpdateEligibility:"/oep/update-user-eligibility",

  // Policy Management
  policyManagementGetAllLead : '/policy/lead/get-all-follow-up',
  policyManagementAssign : '/policy/lead/assign-to',
};
