import { ISopModel } from "@/model/sop_model";
import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";

export const api_get_sop_list = async (data: any) => {
  const res = await API_GET<ISopModel[]>({
    params: data,
    url: URLs.sopList,
  });

  return res;
};

export const api_get_sop_details = async (data: any) => {
  const res = await API_GET<ISopModel>({
    params: data,
    url: URLs.sopGetDetailsById,
  });

  return res;
};

export const api_update_sop = async (data: any) => {
  const res = await API_POST<any>({
    data: data,
    url: URLs.sopUpdate,
  });
  return res;
};

export const api_department_user_sop = async (data: any) => {
  const res = await API_GET<{ id: number; name: string }[]>({
    params: data,
    url: URLs.sopGetUserDepartment,
  });
  return res;
};
