import { IEligibilityModel } from "@/model/oep_new/oep_eligibility_model";
import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";

export const api_oep_eligibility_list = async (data: any) => {
  const res = await API_GET<IEligibilityModel[]>({
    url: URLs.oepGetListEligibilityByUser,
    params: data,
  });

  return res;
};

export const api_oep_eligibility_add_update = async (data: any) => {
  const res = await API_POST<null>({
    url: data.id ? URLs.oepUpdateEligibility : URLs.oepAddEligibility,
     data,
  });

  return res;
};
