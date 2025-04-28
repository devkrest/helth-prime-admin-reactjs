import ICustomerServiceCustomerModel from "@/model/customer_service_customer_model";
import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";

export const api_customer_service_list = async (data: any) => {
  const res = await API_GET<ICustomerServiceCustomerModel[]>({
    url: URLs.customerServiceCustomerGetList,
    params: data,
  });

  return res;
};

export const api_create_update_customer_service = async (data: any) => {
  const res = await API_POST({
    url: URLs.customerServiceCustomerUpdate,
    data,
  });

  return res;
};
