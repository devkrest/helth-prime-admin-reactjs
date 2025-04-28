import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";

export const api_policy_lead_get_all = async (data: any) => {
  const res = await API_GET<any[]>({
    url: URLs.policyManagementGetAllLead,
    params: data,
  });

  return res;
};

export const api_policy_lead_assign_to = async (data: any) => {
  const res = await API_POST({
    url: URLs.policyManagementAssign,
    data,
  });

  return res;
};
