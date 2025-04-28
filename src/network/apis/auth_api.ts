import { IUserModel } from "@/model/user_model";
import { URLs } from "../apis.endpoints";
import { API_POST } from "../axios.services";

export const api_login = async (data: any) => {
  const res = await API_POST<IUserModel>({
    url: URLs.loginByEmailPassword,
    data,
  });

  return res;
};
