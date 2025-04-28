export interface IFollowUpLeadModel {
  id: number;
  policy_id: string;
  lead_id: string;
  carrier_id: string;
  date_modified: Date;
  tld_status: string;
  call_status: string | number;
  call_status_label: string;
  lead_status: string;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
  is_assigned: number;
  lead_first_name: string;
  lead_last_name: string;
  lead_phone: string;
  policy_lead_follow_up_id: string | number;
  user_id: number;
  scheduled_date: Date;
  user: User;
  flag_count: string | number;
  scheduled_type_label: string;
  last_attamp: ILastAttamptModel;
}

interface ILastAttamptModel {
  id: number;
  policy_lead_id: number;
  policy_lead_followup_id: number;
  user_id: number;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
  call_status: number;
  call_status_label: string;
}


export interface User {
  name: string;
}
