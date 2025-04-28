export interface ICustomerModel {
  id: number;
  name: string;
  lead_id: string;
  state: string;
  carrier: number;
  status: number;
  phone: string;
  status_label: string;
  u_name: string;
  created_at: Date;
  updated_at: Date;
  agent_id:number
}
