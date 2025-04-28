import { IUserModel } from "@/model/user_model";
import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";
import ICarrierModel from "@/model/carrier_model";
import IStateModel from "@/model/state_model";

export const api_lead_agent_list = async (data: any) => {
  const res = await API_GET<IUserModel[]>({
    url: URLs.leadTerritoryGetAgentList,
    params: data,
  });

  return res;
};

export const api_lead_agent_analytics = async (data: any) => {
  const res = await API_GET<{
    total_cust: number;
    total_assign_cust: number;
    total_remaining_cust: number;
  }>({
    url: URLs.leadTerritoryGetAnalytics,
    params: data,
  });

  return res;
};

export const api_lead_add_customer = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.leadTerritoryAddCustomer,
    data: data,
  });

  return res;
};

export const api_lead_customer_notification = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.leadTerritoryCustomerAddNotification,
    data: data,
  });

  return res;
};

export const api_get_state = async (data: any) => {
  const res = await API_GET<IStateModel[]>({
    url: URLs.leadTerritoryGetState,
    params: data,
  });

  return res;
};

export const api_get_carrier = async (data: any) => {
  const res = await API_GET<ICarrierModel[]>({
    url: URLs.leadTerritoryGetCarrier,
    params: data,
  });

  return res;
};

export const api_get_total_remaining = async (data: any) => {
  const res = await API_GET<{ total_remaining_cust: string | number }>({
    url: URLs.leadTerritoryGetRemainingTotal,
    params: data,
  });

  return res;
};

export const api_get_total_remaining_by_agent = async (data: any) => {
  const res = await API_GET<{ total_remaining_cust: string | number }>({
    url: URLs.leadTerritoryGetRemainingTotalByAgent,
    params: data,
  });

  return res;
};

export const api_get_state_by_agent = async (data: any) => {
  const res = await API_GET<IStateModel[]>({
    url: URLs.leadTerritoryGetStateByAgent,
    params: data,
  });

  return res;
};

export const api_get_carrier_by_agent = async (data: any) => {
  const res = await API_GET<ICarrierModel[]>({
    url: URLs.leadTerritoryGetCarrierByAgent,
    params: data,
  });

  return res;
};

export const api_get_agent_list_light = async (data: any) => {
  const res = await API_GET<{ name: string; id: number }[]>({
    url: URLs.leadTerritoryGetAgentListLight,
    params: data,
  });

  return res;
};

export const api_swap_by_agent = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.leadTerritorySwapByAgent,
    data: data,
  });

  return res;
};

export const api_swap_by_agent_one = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.leadTerritorySwapByAgentOne,
    data: data,
  });

  return res;
};
