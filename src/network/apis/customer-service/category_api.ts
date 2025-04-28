import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";
import ICustomerServiceCategoryModel from "@/model/customer_service_category_model";

export const api_category_list = async (data: any) => {
  const res = await API_GET<ICustomerServiceCategoryModel[]>({
    url: URLs.customerServiceCategoryGetList,
    params: data,
  });

  return res;
};

export const api_create_update_category = async (data: any) => {
  const res = await API_POST({
    url: data.id
      ? URLs.customerServiceCategoryUpdate
      : URLs.customerServiceCategoryCreate,
    data,
  });

  return res;
};
