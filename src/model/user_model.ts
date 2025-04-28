export interface IUserModel {
  id: number;
  name: string;
  email: string;
  role_id: number;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
  agency_id: number;
  role_name: string;
  modules: Module[];
  agency: Agency;
  token: string;
  refresh_token: string;
  ref_user_id: string;
  department_id: string;
  department_name: string;
  number_of_customer_assigned: number;
  number_of_call_completed: number;
  number_of_call_pending: number;
  plan_tool_without_enforcement: number;
  want_follow_up_lead: number;
  is_oep_added: number;
}

export interface Agency {
  id: number;
  name: string;
  api_key: string;
  api_id: string;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
}

export interface Module {
  id: number;
  user_id: number;
  module_id: number;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
}
