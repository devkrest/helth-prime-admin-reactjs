import { IUserEligibleModel } from "@/model/user_eligibility_model";
import { API_GET } from "../axios.services";
import { URLs } from "../apis.endpoints";


export const api_check_user_eligibility = async (data: any) => {
    const res = await API_GET<IUserEligibleModel>({
      params: data,
      url: URLs.userCheckEligibility,
    });
  
    return res;
  };