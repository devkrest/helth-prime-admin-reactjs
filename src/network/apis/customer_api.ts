import { ICustomerModel } from "@/model/customer_model";
import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";

export const api_customer_list = async (data: any) => {
  const res = await API_GET<ICustomerModel[]>({
    url: URLs.customerGetList,
    params: data,
  });

  return res;
};

export const api_create_update_customer = async (data: any) => {
  const res = await API_POST({
    url: data.id ? URLs.customerUpdate : URLs.customerAdd,
    data,
  });

  return res;
};

export const api_create_update_customer_bluck = async (data: any) => {
  const res = await API_POST({
    url: URLs.customerAddBluck,
    data,
  });

  return res;
};
