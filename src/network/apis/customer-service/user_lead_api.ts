import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";
import { IUserModel } from "@/model/user_model";

export const api_customer_service_agent_list = async (data: any) => {
  const res = await API_GET<IUserModel[]>({
    url: URLs.customerServiceAgentGetList,
    params: data,
  });

  return res;
};

export const api_customer_service_analitics = async (data: any) => {
  const res = await API_GET<{
    total_cust: number;
    total_assign_cust: number;
    total_remaining_cust: number;
  }>({
    url: URLs.customerServiceAgentAnalitics,
    params: data,
  });

  return res;
};

export const api_customer_service_swap_by_agent = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.customerServiceAgentSwap,
    data: data,
  });

  return res;
};

export const api_customer_service_add_customer = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.customerServiceAgentAddCustomer,
    data: data,
  });

  return res;
};

export const api_customer_service_get_total_remaining_by_agent = async (
  data: any
) => {
  const res = await API_GET<{ total_remaining_cust: string | number }>({
    url: URLs.customerServiceAgentTotalByAgent,
    params: data,
  });

  return res;
};

export const api_customer_service_get_total_remaining = async (data: any) => {
  const res = await API_GET<{ total_remaining_cust: string | number }>({
    url: URLs.customerServiceAgentRemainingTotal,
    params: data,
  });

  return res;
};

export const api_customer_service_get_agent_list_light = async (data: any) => {
  const res = await API_GET<{ name: string; id: number }[]>({
    url: URLs.customerServiceAgentListLight,
    params: data,
  });

  return res;
};

export const api_customer_service_swap_by_agent_one = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.customerServiceAgentSwapOne,
    data: data,
  });

  return res;
};
