import { IUserModel } from "@/model/user_model";
import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";

export const api_get_user_details = async (data: any) => {
  const res = await API_GET<IUserModel>({
    url: URLs.adminGetById,
    params: data,
  });

  return res;
};

export const api_get_user_list = async (data: any) => {
  const res = await API_GET<IUserModel[]>({
    url: URLs.userGetList,
    params: data,
  });

  return res;
};

export const api_create_user = async (data: any) => {
  const res = await API_POST({
    url: data.id ? URLs.userUpdate : URLs.userCreate,
    data,
  });

  return res;
};

export const api_all_user_list = async (data?:any) => {
  const res = await API_GET<IUserModel[]>({
    url: URLs.userAllUserList,
    params:data ?? {},
  });

  return res;
};

export const api_add_update_user_eligibility = async (data:any) => {
  const res = await API_POST<null>({
    url: URLs.userAddUpdateEligibility,
    data:data,
  });

  return res;
};
