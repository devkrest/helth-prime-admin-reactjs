import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";
import { IRoleModel } from "@/model/role_model";

export const api_role_list = async (data: any) => {
  const res = await API_GET<IRoleModel[]>({
    url: URLs.roleGetList,
    params: data,
  });

  return res;
};

export const api_create_update_role = async (data: any) => {
  const res = await API_POST({
    url: data.id ? URLs.roleUpdate : URLs.roleCreate,
    data,
  });

  return res;
};
