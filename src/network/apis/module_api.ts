import { IModuleModel } from "@/model/module_model";
import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";

export const api_module_list = async (data: any) => {
  const res = await API_GET<IModuleModel[]>({
    url: URLs.moduleGetList,
    params: data,
  });

  return res;
};

export const api_create_update_module = async (data: any) => {
  const res = await API_POST({
    url: data.id ? URLs.moduleUpdate : URLs.moduleCreate,
    data,
  });

  return res;
};
