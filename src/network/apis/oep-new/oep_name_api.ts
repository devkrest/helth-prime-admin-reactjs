import { IAorNameModel } from "@/model/oep_new/aor_name_model";
import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";

export const api_oep_aor_name_list = async (data: any) => {
  const res = await API_GET<IAorNameModel[]>({
    url: URLs.oepGetListAorName,
    params: data,
  });

  return res;
};

export const api_oep_aor_name_add_update = async (data: any) => {
  const res = await API_POST<null>({
    url: data.id ? URLs.oepUpdateAorName : URLs.oepAddAorName,
    data,
  });

  return res;
};
