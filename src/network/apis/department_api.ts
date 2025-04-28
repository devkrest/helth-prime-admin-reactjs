import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";
import { IDepartmentModel } from "@/model/department_model";

export const api_get_department_details = async (data: any) => {
  const res = await API_GET<IDepartmentModel>({
    url: URLs.departmentGetById,
    params: data,
  });

  return res;
};

export const api_get_department_list = async (data: any) => {
  const res = await API_GET<IDepartmentModel[]>({
    url: URLs.departmentGetList,
    params: data,
  });

  return res;
};

export const api_create_department = async (data: any) => {
  const res = await API_POST({
    url: data.id ? URLs.departmentUpdate : URLs.departmentAdd,
    data,
  });

  return res;
};

export const api_all_department_list = async () => {
  const res = await API_GET<IDepartmentModel[]>({
    url: URLs.departmentAllList,
    params: {},
  });

  return res;
};
