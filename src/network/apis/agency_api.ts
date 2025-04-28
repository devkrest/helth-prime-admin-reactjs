import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";
import { IAgencyModel } from "@/model/agency_model";

export const api_agecny_list = async (data: any) => {
  const res = await API_GET<IAgencyModel[]>({
    url: URLs.agencyGetList,
    params: data,
  });

  return res;
};

export const api_create_update_agecny = async (data: any) => {
  const res = await API_POST({
    url: data.id ? URLs.agencyUpdate : URLs.agencyCreate,
    data,
  });

  return res;
};
