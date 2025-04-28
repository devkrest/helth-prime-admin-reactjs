import { URLs } from "../apis.endpoints";
import { API_POST } from "../axios.services";

export const api_notification_add = async (data: any) => {
  const res = await API_POST<null>({
    url: URLs.notificationAdd,
    data: data,
  });

  return res;
};
