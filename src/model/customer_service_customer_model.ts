export default interface ICustomerServiceCustomerModel {
  id: number;
  lead_id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tld_status: string;
  category_id: string;
  category_title: string;
  policy_id: string | number;
  carrier_id: string | number;
  agent_id: string | number;
  agent_name: string;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
}
